from typing import List

from server.common.utils import parse_float
from server.companies import Company, SearchParams
from server.products import Product


class LacosteApi(Company):
    title = 'Lacoste'
    main_url = 'https://lacoste.ru'
    logo = '/companies/lacoste/img/logo.png'

    @classmethod
    def search(cls, params: SearchParams) -> List[Product]:
        response = cls.get(
            f'https://lacoste.ru/api/catalog.php?q={params.query}&perPage={params.size}'
        )
        items = response.json().get('list', [])

        result_items: List[Product] = []
        for item in items:
            item_code = item['code']

            response = cls.get(
                f"https://lacoste.ru/api/catalog.php?ELEMENT_CODE={item_code}"
            )
            description = response.json()['item']['catDesc']

            result_items.append(
                Product(
                    title=item['name'],
                    price=parse_float(item['prices']['current']),
                    image_url=f"https:{item['images'][0]}",
                    product_url=f"https://lacoste.ru/catalog/{item['sec_code']}/{item_code}/",
                    description=description,
                    site_logo=cls.logo,
                )
            )

        return result_items
