from typing import List

from server.common.utils import parse_float
from server.models import Company, Product, SearchParams


class BaseOnDiginetica(Company):
    api_key: str

    @classmethod
    async def search(cls, params: SearchParams) -> List[Product]:
        r = await cls.get(
            f'https://sort.diginetica.net/search?st={params.query}&apiKey={cls.api_key}&fullData=true&size={params.size}'
        )

        items = r['products']

        return [
            Product(
                search_query=params.query,
                title=item['name'],
                price=parse_float(item['price']),
                image_url=item['image_url'],
                product_url=f"{cls.main_url}{item['link_url']}",
                description=f'Производитель: {brand}' if (
                    brand := item.get('brand')
                ) else '',
                site_logo=cls.logo
            ) for item in items
        ]


class AllTimeApi(BaseOnDiginetica):
    title = 'AllTime'
    main_url = 'https://www.alltime.ru'
    logo = '/companies/alltime/img/logo.png'
    api_key = 'SINI4S7JJN'


class AmWineApi(BaseOnDiginetica):
    title = 'Ароматный Мир'
    main_url = 'https://amwine.ru'
    logo = '/companies/amwine/img/logo.png'
    api_key = '949JF9H5VQ'


class AzbukaVkusaApi(BaseOnDiginetica):
    title = 'Азбука Вкуса'
    main_url = 'https://av.ru'
    logo = '/companies/azbukavkusa/img/logo.png'
    api_key = '5BZ4H1HRDU'


class BoscoApi(BaseOnDiginetica):
    title = 'BOSCO'
    main_url = 'https://www.bosco.ru'
    logo = '/companies/bosco/img/logo.png'
    api_key = '8C9NW25DDM'


class ElKompApi(BaseOnDiginetica):
    title = 'Мир Электроники'
    main_url = 'https://elkomp.ru'
    logo = '/companies/elkomp/img/logo.jpg'
    api_key = 'A23FGJP9HO'


class HolodilnikRuApi(BaseOnDiginetica):
    title = 'HOLODILNIK.RU'
    main_url = 'https://www.holodilnik.ru'
    logo = '/companies/holodilnikru/img/logo.png'
    api_key = 'BZQ1NIP98I'


class PetrovichApi(BaseOnDiginetica):
    title = 'Петрович'
    main_url = 'https://petrovich.ru'
    logo = '/companies/petrovich/img/logo.png'
    api_key = '170RDVB2N9'


class SportMasterApi(BaseOnDiginetica):
    title = 'Спортмастер'
    main_url = 'https://www.sportmaster.ru'
    logo = '/companies/sportmaster/img/logo.png'
    api_key = 'HNUM1K4B2N'
