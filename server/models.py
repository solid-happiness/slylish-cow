import hashlib
from abc import ABC
from typing import Coroutine, List, NamedTuple
import aiohttp


class RatingMixIn:
    rating: int

    def _compute_rating(self):
        raise NotImplemented

    def __init__(self, *args, **kwargs):
        self.rating = int(self._compute_rating())

    def __lt__(self, other):
        return self.rating < other.rating
    
    def to_dict(self):
        return {'rating': self.rating}


class Product(RatingMixIn):
    search_query: str
    title: str
    image_url: str
    price: float
    product_url: str
    description: str
    site_logo: str

    def __init__(self, *args, **kwargs):
        self.search_query = kwargs.get('search_query')
        self.title = kwargs.get('title')
        self.image_url = kwargs.get('image_url')
        self.price = kwargs.get('price')
        self.product_url = kwargs.get('product_url')
        self.description = kwargs.get('description')
        self.site_logo = kwargs.get('site_logo')
        super().__init__(*args, **kwargs)
    
    def _compute_rating(self):
        rating = 0
        for word in self.search_query.split():
            rating += self.title.lower().count(word.lower()) * 2
            rating += self.description.lower().count(word.lower())
        return rating

    def to_json(self):
        rating_json = super().to_dict()
        return {
            'title': self.title,
            'imageUrl': self.image_url,
            'price': self.price,
            'productUrl': self.product_url,
            'description': self.description,
            'siteLogo': self.site_logo,
            **rating_json,
        }


class SearchParams(NamedTuple):
    query: str
    size: int


class Company(ABC):
    title: str
    main_url: str
    logo: str

    @classmethod
    def get_id(cls):
        if not hasattr(cls, '_id'):
            hashed = cls.title + cls.main_url + cls.logo
            digest = hashlib.md5(hashed.encode('utf-8')).hexdigest()
            cls._id = int(digest, 16) % 1000
        return cls._id

    @classmethod
    async def get(cls, url: str) -> Coroutine:
        async with aiohttp.request('GET', url) as response:
            json_reponse = await response.json()
            response.close()
            return json_reponse

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
