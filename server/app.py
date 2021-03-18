from typing import List
import asyncio
from contextlib import suppress

from flask import Flask, jsonify, request

from server.models import Company, SearchParams
from server.companies import COMPANIES_LIST


app = Flask(__name__)


DEFAULT_TIMEOUT = 2.0

async def asynchronous_search(companies: List[Company], params: SearchParams):
    futures = [company.search(params) for company in companies]
    done, pending = await asyncio.wait(
        futures, timeout=DEFAULT_TIMEOUT, return_when=asyncio.ALL_COMPLETED)
    results = []
    for task in done:
        with suppress(Exception):
            results.extend(
                task.result()
            )

    for future in pending:
        future.cancel()
    return results

@app.route('/api/search', methods=['GET'])
def search_product():
    query = request.args.get('query')
    results_size = int(request.args.get('size', 15))
    if not query:
        return jsonify({'status': 'error', 'message': 'EMPTY_QUERY'})
    companies_ids = request.args.get('apis')
    if not companies_ids:
        return jsonify({
            'error': 'NOT_SET_APIS'
        })
    companies_ids = list(map(
        lambda company_id: int(company_id),
        companies_ids.split(',')
    ))
    companies_to_search = filter(
        lambda company: company.get_id() in companies_ids,
        COMPANIES_LIST
    )

    ioloop = asyncio.new_event_loop()
    asyncio.set_event_loop(ioloop)
    searched_products = ioloop.run_until_complete(
        asynchronous_search(
            companies=companies_to_search,
            params=SearchParams(query=query, size=results_size),
        )
    )
    ioloop.close()

    return jsonify({
        'payload': list(map(
            lambda product: product.to_json(),
            sorted(searched_products[:results_size * len(COMPANIES_LIST)], reverse=True)
        ))
    })


@app.route('/api/companies', methods=['GET'])
def get_companies():
    return jsonify({
        'payload': [company.to_dict() for company in COMPANIES_LIST]
    })
