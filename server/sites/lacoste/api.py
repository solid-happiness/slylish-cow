def search(query):
    response = requests.get(
        f'https://lacoste.ru/api/catalog.php?q={query}&perPage=3'
    )
    items = response.json().get('list', [])

    result_items = []
    for item in items:
        item_code = item['code']

        response = requests.get(
            f"https://lacoste.ru/api/catalog.php?ELEMENT_CODE={item_code}"
        )
        description = response.json()['item']['catDesc']

        result_items.append({
            'title': item['name'],
            'price': float(re.findall(r'\d+', item['prices']['current'].replace(' ', ''))[0]),
            'image_url': f"https:{item['images'][0]}",
            'product_url': f"https://lacoste.ru/catalog/{item['sec_code']}/{item_code}/",
            'description': description,
        })

    return result_items
