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
    companies_ids = request.args.get('apis')
    if companies_ids:
        companies_ids = list(map(lambda company_id: int(company_id), companies_ids.split(',')))
        companies_to_search = filter(lambda company: company.get_id() in companies_ids, COMPANIES_LIST)
    else:
        companies_to_search = COMPANIES_LIST

    searched_products = []
    search_params = SearchParams(query=query, size=results_size)
    for company in companies_to_search:
        searched_products.extend(
            company.search(search_params)
        )

    return jsonify({
        'payload': list(map(lambda product: product.to_json(), searched_products[:results_size * len(COMPANIES_LIST)]))
    })


@app.route('/api/companies', methods=['GET'])
def get_companies():
    return jsonify({
        'payload': [company.to_dict() for company in COMPANIES_LIST]
    })
