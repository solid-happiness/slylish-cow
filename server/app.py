from flask import Flask, jsonify, request
from typing import List

from server.companies import Company, SearchParams
from server.sites.aptekaru.api import AptekaruApi
from server.sites.auchan.api import AuchanApi
from server.sites.lacoste.api import LacosteApi
from server.sites.ikea.api import IkeaApi


COMPANIES_LIST: List[Company] = [
    Company('Ikea', 'https://yandex.ru', IkeaApi),
    Company('Lacoste', 'https://lacoste.ru', LacosteApi),
    Company('Auchan', 'https://auchan.ru', AuchanApi),
    Company('Aptekaru', 'https://apteka.ru', AptekaruApi),
]


app = Flask(__name__)


@app.route('/test')
def main_api():
    return jsonify({'test': 'ok'})


@app.route('/search', methods=['GET'])
def search_product():
    query = request.args.get('query')
    results_size = request.args.get('size', 10)
    if not query:
        return jsonify({'status': 'error', 'message': 'EMPTY_QUERY'})

    searched_products = []
    search_params = SearchParams(query=query, size=results_size)
    for company in COMPANIES_LIST:
        searched_products.extend(
            company.api.search(search_params)
        )
    return jsonify(
        {
            'payload': list(map(lambda product: product.to_json(), searched_products[:results_size]))
        }
    )
