from abc import ABC
from typing import List, NamedTuple

from server.products import Product


class SearchParams(NamedTuple):
    query: str
    size: int


class Company(NamedTuple):
    title: str
    main_url: str
    logo: str

    def serach(params: SearchParams) -> List[Product]:
        raise NotImplementedError

    def __eq__(self, another):
        if not issubclass(type(another, Company)):
            return False
        return self.title == another.title and self.main_image_url == another.main_image_url
    
    def __hash__(self):
        return hash(self.title + self.main_image_url)
