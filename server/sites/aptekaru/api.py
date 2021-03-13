import re

import requests


def clean_html(raw_html):
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext


def search(query):
    response = requests.get(
        f'https://api.apteka.ru/Search/ByPhrase?phrase={query}&pageSize=3'
    )
    try:
        items = response.json().get('result')
    except AttributeError:
        return []

    if not items:
        return []

    result_items = []
    for item in items:
        unique_info = item.get('uniqueItemInfo')
        item_id = item['id']

        response = requests.get(
            f"https://api.apteka.ru/Item/Info?id={item_id}/"
        )
        description = response.json().get('genDesc', '')

        title = clean_html(item['tradeName'])

        if unique_info:
            title = unique_info['goodNaming']['tradeName']

        result_items.append({
            'title': title,
            'price': item['minPrice'],
            'image_url': item['photos'][0]['original'],
            'product_url': f"https://apteka.ru/product/{item_id}/",
            'description': description
        })

    return result_items
