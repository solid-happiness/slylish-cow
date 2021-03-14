from typing import List

from server.common.utils import clean_html
from server.companies import Company, SearchParams
from server.products import Product


class AptekaruApi(Company):
    title = 'Apteka.ru'
    main_url = 'https://apteka.ru'
    logo = '/companies/aptekaru/img/logo.png'

    @classmethod
    def search(cls, params: SearchParams) -> List[Product]:
        response = cls.get(
            f'https://api.apteka.ru/Search/ByPhrase?phrase={params.query}&pageSize={params.size}'
        )
        try:
            items = response.json().get('result')
        except AttributeError:
            return []

        if not items:
            return []

        result_items: List[Product] = []
        for item in items:
            unique_info = item.get('uniqueItemInfo')
            item_id = item['id']

            response = cls.get(
                f"https://api.apteka.ru/Item/Info?id={item_id}/"
            )
            description = response.json().get('genDesc', '')

            title = clean_html(item['tradeName'])

            if unique_info:
                title = unique_info['goodNaming']['tradeName']

            result_items.append(
                Product(
                    title=title,
                    price=item['minPrice'],
                    image_url=item['photos'][0]['original'],
                    product_url=f"https://apteka.ru/product/{item_id}/",
                    description=description,
                    site_logo=cls.logo,
                )
            )

        return result_items
