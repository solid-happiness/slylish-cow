import re
from typing import List

import requests
from server.common.utils import clean_html, parse_float
from server.models import Product, Company, SearchParams


class SamsungApi(Company):
    title = 'Samsung'
    main_url = 'https://www.samsung.com/ru/'
    logo = '/companies/samsung/img/logo.png'

    @classmethod
    def search(cls, params: SearchParams) -> List[Product]:
        response = requests.get(
            f'https://esapi.samsung.com/search/query/v6?start=0&num={params.size}&categoryTab=all&searchValue={params.query}&siteCd=ru'
        )

        items = response.json()['response']['resultData']['resultList']

        if not items:
            return []

        items = list(filter(
            lambda item: item['contentSource'] == 'Products',
            items[0]['contentList']
        ))

        result_items = []

        for item in items:
            model = item['modelList'][0]

            result_items.append(
                Product(
                    search_query=params.query,
                    title=clean_html(item['title']),
                    price=parse_float(model['priceCurrency']),
                    image_url=f"https://images.samsung.com/is/image/samsung/{model['galleryImage'][0]}",
                    product_url=f"https://www.samsung.com{model['originPdpUrl']}",
                    description=clean_html(item['displaySortTitle']),
                    site_logo=cls.logo
                )
            )

        return result_items
