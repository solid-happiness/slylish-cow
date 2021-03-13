import requests


def search(query):
    response = requests.get(
        f'https://www.auchan.ru/v1/search?merchantId=1&query={query}'
    )
    items = response.json().get('items')

    if not items:
        return []

    items = list(chain(*[value['products'] for value in items.values()]))[:3]

    result_items = []
    for item in items:
        item_code = item['code']

        response = requests.get(
            f"https://www.auchan.ru/v1/catalog/product-detail?code={item_code}&merchantId=1"
        )
        description = response.json()['description']['content']

        result_items.append({
            'title': item['name'],
            'price': item['price']['value'],
            'image_url': f"https://www.auchan.ru/files/compressed/{item['image']['id']}/",
            'product_url': f"https://www.auchan.ru/product/{item['code']}/",
            'description': description
        })

    return result_items
