import re


def clean_html(raw_html):
    return re.sub('<.*?>', '', raw_html)


def parse_float(text):
    if text:
        text_without_spaces = re.sub(r'\s+', '', text, flags=re.UNICODE)
        return float(re.findall(r'\d+', text_without_spaces)[0])

    return 0
