from abc import ABC
from typing import List, NamedTuple

from server.products import Product


class SearchParams(NamedTuple):
    query: str
    size: int


class SearchApi(ABC):

    def search(params: SearchParams) -> List[Product]:
        raise NotImplementedError


class Company(NamedTuple):
    title: str
    main_image_url: str
    api: SearchApi

    def __eq__(self, another):
        if not issubclass(type(another, Company)):
            return False
        return self.title == another.title and self.main_image_url == another.main_image_url
    
    def __hash__(self):
        return hash(self.title + self.main_image_url)
