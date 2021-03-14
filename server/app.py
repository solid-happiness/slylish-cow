from typing import List

from flask import Flask, jsonify, request

from server.models import SearchParams
from server.companies import COMPANIES_LIST


app = Flask(__name__)


@app.route('/api/search', methods=['GET'])
def search_product():
    query = request.args.get('query')
    results_size = int(request.args.get('size', 15))
    if not query:
        return jsonify({'status': 'error', 'message': 'EMPTY_QUERY'})

    searched_products = []
    search_params = SearchParams(query=query, size=results_size)
    for company in COMPANIES_LIST:
        searched_products.extend(
            company.search(search_params)
        )

    return jsonify({
        'payload': list(map(lambda product: product.to_json(), searched_products[:results_size * len(COMPANIES_LIST)]))
    })
