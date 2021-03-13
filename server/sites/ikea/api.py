def ikea(query):
    response = requests.get(
        f'https://sik.search.blue.cdtapps.com/ru/ru/search-result-page?q={query}&size=3&columns=4'
    )
    search_result = response.json().get('searchResultPage')

    if not search_result:
        return []

    items = search_result['products']['main']['items']

    return [
        {
            'title': item['product']['name'],
            'price': item['product']['priceNumeral'],
            'image_url': item['product']['mainImageUrl'],
            'product_url': item['product']['pipUrl'],
            'description': item['product']['typeName']
        } for item in items
    ]
