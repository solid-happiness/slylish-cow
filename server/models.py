from typing import List, NamedTuple
from requests.models import Response
from requests import Session


class Product(NamedTuple):
    title: str
    image_url: str
    price: float
    product_url: str
    description: str
    site_logo: str

    def to_json(self):
        return {
            'title': self.title,
            'imageUrl': self.image_url,
            'price': self.price,
            'productUrl': self.product_url,
            'description': self.description,
            'siteLogo': self.site_logo
        }


class SearchParams(NamedTuple):
    query: str
    size: int


class Company(NamedTuple):
    title: str
    main_url: str
    logo: str

    @classmethod
    def get_session(cls):
        if not hasattr(cls, '_session'):
            cls._session = Session()
        return cls._session
    
    @classmethod
    def get_id(cls):
        if not hasattr(cls, '_id'):
            cls._id = hash(cls) % 1000
        return cls._id

    @classmethod
    def get(cls, query: str) -> Response:
        return cls.get_session().get(query)

    def serach(params: SearchParams) -> List[Product]:
        raise NotImplementedError

    @classmethod
    def to_dict(cls):
        return {
            'id': cls.get_id(),
            'title': cls.title,
            'mainUrl': cls.main_url,
            'logo': cls.logo,
        }

    def __eq__(self, another):
        if not issubclass(type(another, Company)):
            return False
        return self.title == another.title and self.main_image_url == another.main_image_url
    
    def __hash__(self):
        return hash(self.title + self.main_image_url + self.main_url)
