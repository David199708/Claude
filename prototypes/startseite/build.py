# Baut prototypes/startseite/index.html: setzt Fotos, Logo und Schriften als data-URIs in template.html ein,
# damit die Datei ohne Server und ohne Internet funktioniert.
# Aufruf aus dem Projektordner: python3 prototypes/startseite/build.py
import base64, io, pathlib
from PIL import Image

root = pathlib.Path(__file__).resolve().parents[2]
here = pathlib.Path(__file__).resolve().parent


def uri(data: bytes, mime: str) -> str:
    return f'data:{mime};base64,' + base64.b64encode(data).decode()


def photo(path: str) -> str:
    buf = io.BytesIO()
    Image.open(root / path).convert('RGB').save(buf, 'WEBP', quality=82)
    return uri(buf.getvalue(), 'image/webp')


fonts = root / 'node_modules/@fontsource'
values = {
    'HOUSE': photo('src/assets/gutshaus.webp'),
    'ROOM': photo('src/assets/innen-1.png'),
    'CORNER': photo('src/assets/innen-2.png'),
    'LOGO': uri((root / 'public/logo.png').read_bytes(), 'image/png'),
    'CORM400': uri((fonts / 'cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2').read_bytes(), 'font/woff2'),
    'CORM500': uri((fonts / 'cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2').read_bytes(), 'font/woff2'),
    'CORM400I': uri((fonts / 'cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2').read_bytes(), 'font/woff2'),
    'CORM500I': uri((fonts / 'cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2').read_bytes(), 'font/woff2'),
    'ALLURA': uri((fonts / 'allura/files/allura-latin-400-normal.woff2').read_bytes(), 'font/woff2'),
}

html = (here / 'template.html').read_text(encoding='utf-8')
for key, value in values.items():
    html = html.replace('{{' + key + '}}', value)
assert '{{' not in html, 'Platzhalter nicht ersetzt'
out = here / 'index.html'
out.write_text(html, encoding='utf-8')
print(f'{out.relative_to(root)}: {len(html) // 1024} KB')
