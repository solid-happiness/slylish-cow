from typing import List

import requests
from server.companies import SearchApi, SearchParams
from server.products import Product


class NikaApi(SearchApi):

    def search(params: SearchParams) -> List[Product]:
        r = requests.get(
            f'https://api.hosting.ue0.ru/v5/Catalog/Goods/Search?q={params.query}&take={params.size}'
        )

        items = r.json()['data']['elements']

        return [
            Product(
                title=item['name'],
                price=item['price']['with_discount'] / 100,
                image_url=item['images']['main'],
                product_url=f"https://nikamebelopt.ru/catalog/{item['group']['slug']}/{item['slug']}/",
                description=item['additional_properties']['description'],
                site_logo='/companies/nika/img/logo.png'
            ) for item in items
        ]
