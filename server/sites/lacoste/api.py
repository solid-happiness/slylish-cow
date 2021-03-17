from typing import List

from server.common.utils import parse_float
from server.models import Product, Company, SearchParams


class LacosteApi(Company):
    title = 'Lacoste'
    main_url = 'https://lacoste.ru'
    logo = '/companies/lacoste/img/logo.png'

    @classmethod
    async def search(cls, params: SearchParams) -> List[Product]:
        response = await cls.get(
            f'https://lacoste.ru/api/catalog.php?q={params.query}&perPage={params.size}'
        )
        items = response.get('list', [])

        result_items: List[Product] = []
        for item in items:
            item_code = item['code']

            response = await cls.get(
                f"https://lacoste.ru/api/catalog.php?ELEMENT_CODE={item_code}"
            )
            description = response['item']['catDesc']

            result_items.append(
                Product(
                    search_query=params.query,
                    title=item['name'],
                    price=parse_float(item['prices']['current']),
                    image_url=f"https:{item['images'][0]}",
                    product_url=f"https://lacoste.ru/catalog/{item['sec_code']}/{item_code}/",
                    description=description,
                    site_logo=cls.logo,
                )
            )

        return result_items
