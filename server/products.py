from typing import NamedTuple


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
