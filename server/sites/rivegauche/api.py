from typing import List

from server.common.utils import clean_html
from server.models import Company, Product, SearchParams


class RiveGaucheApi(Company):
    title = 'Rive Gauche'
    main_url = 'https://shop.rivegauche.ru/'
    logo = '/companies/rivegauche/img/logo.png'

    @classmethod
    async def search(cls, params: SearchParams) -> List[Product]:
        r = await cls.get(
            f'https://shop.rivegauche.ru/rg/v1/newRG/products/search?currentPage=0&pageSize={params.size}&text={params.query}'
        )

        items = r['results']

        return [
            Product(
                search_query=params.query,
                title=item['name'],
                price=item['prices'][0]['value'],
                image_url=f"https://shop.rivegauche.ru{item['listingImage']['url']}",
                product_url=f"https://shop.rivegauche.ru{item['url']}",
                description=clean_html(item['description']),
                site_logo=cls.logo
            ) for item in items
        ]
