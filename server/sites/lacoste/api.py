from typing import List
from server.products import Product
from server.companies import SearchApi, SearchParams
import requests
import re


class LacosteApi(SearchApi):

    def search(params: SearchParams) -> List[Product]:
        response = requests.get(
            f'https://lacoste.ru/api/catalog.php?q={params.query}&perPage={params.size}'
        )
        items = response.json().get('list', [])

        result_items = []
        for item in items:
            item_code = item['code']

            response = requests.get(
                f"https://lacoste.ru/api/catalog.php?ELEMENT_CODE={item_code}"
            )
            description = response.json()['item']['catDesc']

            result_items.append(
                Product(
                    title=item['name'],
                    price=float(re.findall(r'\d+', item['prices']['current'].replace(' ', ''))[0]),
                    image_url=f"https:{item['images'][0]}",
                    product_url=f"https://lacoste.ru/catalog/{item['sec_code']}/{item_code}/",
                    description=description,
                )
            )

        return result_items
