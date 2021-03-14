import requests


def search(query):
    r = requests.get(
        f'https://api.hosting.ue0.ru/v5/Catalog/Goods/Search?q={query}&take=5'
    )

    items = r.json()['data']['elements']

    return [
        {
            'title': item['name'],
            'price': item['price']['with_discount'] / 100,
            'image_url': item['images']['main'],
            'product_url': f"https://nikamebelopt.ru/catalog/{item['group']['slug']}/{item['slug']}/",
            'description': item['additional_properties']['description'],
        } for item in items
    ]
