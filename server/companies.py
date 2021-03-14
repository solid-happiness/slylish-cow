from typing import List, NamedTuple
from requests.models import Response
from requests import Session

from server.products import Product


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
    def get(cls, query: str) -> Response:
        return cls.get_session().get(query)

    def serach(params: SearchParams) -> List[Product]:
        raise NotImplementedError

    def __eq__(self, another):
        if not issubclass(type(another, Company)):
            return False
        return self.title == another.title and self.main_image_url == another.main_image_url
    
    def __hash__(self):
        return hash(self.title + self.main_image_url)
