from typing import List
from itertools import chain

from server.models import Product, Company, SearchParams


class AuchanApi(Company):
    title = 'Auchan'
    main_url = 'https://auchan.ru'
    logo = '/companies/auchan/img/logo.png'

    @classmethod
    async def search(cls, params: SearchParams) -> List[Product]:
        response = await cls.get(
            f'https://www.auchan.ru/v1/search?merchantId=1&query={params.query}'
        )
        items = response.get('items')

        if not items:
            return []

        items = list(chain(*[value['products'] for value in items.values()]))[:3]

        result_items: List[Product] = []
        for item in items:
            item_code = item['code']

            response = await cls.get(
                f"https://www.auchan.ru/v1/catalog/product-detail?code={item_code}&merchantId=1"
            )
            description = response['description']['content']

            result_items.append(
                    Product(
                    search_query=params.query,
                    title=item['name'],
                    price=item['price']['value'],
                    image_url=f"https://www.auchan.ru/files/compressed/{item['image']['id']}/",
                    product_url=f"https://www.auchan.ru/product/{item['code']}/",
                    description=description,
                    site_logo=cls.logo,
                )
            )

        return result_items
