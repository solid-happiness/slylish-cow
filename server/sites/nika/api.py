from typing import List

import requests
from server.companies import Company, SearchParams
from server.products import Product


class NikaApi(Company):
    title = 'Nika'
    main_url = 'https://nikamebelopt.ru'
    logo = '/companies/nika/img/logo.png'

    @classmethod
    def search(cls, params: SearchParams) -> List[Product]:
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
                site_logo=cls.logo
            ) for item in items
        ]
