import requests
from typing import List

from server.products import Product
from server.companies import SearchApi, SearchParams


class IkeaApi(SearchApi):

    def search(params: SearchParams) -> List[Product]:
        response = requests.get(
            f'https://sik.search.blue.cdtapps.com/ru/ru/search-result-page?q={params.query}&size={params.size}&columns=4'
        )
        search_result = response.json().get('searchResultPage')

        if not search_result:
            return []

        items = list(filter(
            lambda item: item.get('product'),
            search_result['products']['main']['items']
        ))

        return [
            Product(
                title=item['product']['name'],
                price=item['product']['priceNumeral'],
                image_url=item['product']['mainImageUrl'],
                product_url=item['product']['pipUrl'],
                description=item['product']['typeName']
            ) for item in items
        ]
