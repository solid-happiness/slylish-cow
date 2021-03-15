from typing import List

from server.common.utils import parse_float
from server.models import Company, Product, SearchParams


def search(cls, params):
    r = cls.get(
        f'https://sort.diginetica.net/search?st={params.query}&apiKey={cls.api_key}&fullData=true&size={params.size}'
    )

    items = r.json()['products']

    return [
        Product(
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


class AllTimeApi(Company):
    title = 'AllTime'
    main_url = 'https://www.alltime.ru'
    logo = '/companies/alltime/img/logo.png'
    api_key = 'SINI4S7JJN'

    @classmethod
    def search(cls, params: SearchParams) -> List[Product]:
        return search(cls, params)


class AmWineApi(Company):
    title = 'Ароматный Мир'
    main_url = 'https://amwine.ru'
    logo = '/companies/amwine/img/logo.png'
    api_key = '949JF9H5VQ'

    @classmethod
    def search(cls, params: SearchParams) -> List[Product]:
        return search(cls, params)


class AzbukaVkusaApi(Company):
    title = 'Азбука Вкуса'
    main_url = 'https://av.ru'
    logo = '/companies/azbukavkusa/img/logo.png'
    api_key = '5BZ4H1HRDU'

    @classmethod
    def search(cls, params: SearchParams) -> List[Product]:
        return search(cls, params)


class BoscoApi(Company):
    title = 'BOSCO'
    main_url = 'https://www.bosco.ru'
    logo = '/companies/bosco/img/logo.png'
    api_key = '8C9NW25DDM'

    @classmethod
    def search(cls, params: SearchParams) -> List[Product]:
        return search(cls, params)


class ElKompApi(Company):
    title = 'Мир Электроники'
    main_url = 'https://elkomp.ru'
    logo = '/companies/elkomp/img/logo.jpg'
    api_key = 'A23FGJP9HO'

    @classmethod
    def search(cls, params: SearchParams) -> List[Product]:
        return search(cls, params)


class HolodilnikRuApi(Company):
    title = 'HOLODILNIK.RU'
    main_url = 'https://www.holodilnik.ru'
    logo = '/companies/holodilnikru/img/logo.png'
    api_key = 'BZQ1NIP98I'

    @classmethod
    def search(cls, params: SearchParams) -> List[Product]:
        return search(cls, params)


class PetrovichApi(Company):
    title = 'Петрович'
    main_url = 'https://petrovich.ru'
    logo = '/companies/petrovich/img/logo.png'
    api_key = '170RDVB2N9'

    @classmethod
    def search(cls, params: SearchParams) -> List[Product]:
        return search(cls, params)


class SportMasterApi(Company):
    title = 'Спортмастер'
    main_url = 'https://www.sportmaster.ru'
    logo = '/companies/sportmaster/img/logo.png'
    api_key = 'HNUM1K4B2N'

    @classmethod
    def search(cls, params: SearchParams) -> List[Product]:
        return search(cls, params)
