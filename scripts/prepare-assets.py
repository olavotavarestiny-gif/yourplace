"""Regenerate optimised images from the documented original company sources."""
import io
import json
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGE_DIR = ROOT / 'public' / 'images'


def optimise(asset):
    data = urllib.request.urlopen(asset['source'], timeout=45).read()
    image = Image.open(io.BytesIO(data)).convert('RGB')
    image.thumbnail((1920, 1920))
    image.save(IMAGE_DIR / asset['file'], quality=87, method=6)
    image.thumbnail((800, 800))
    image.save(IMAGE_DIR / asset['file'].replace('.webp', '-800.webp'), quality=82, method=6)


if __name__ == '__main__':
    manifest = json.loads((IMAGE_DIR / 'sources.json').read_text())
    with ThreadPoolExecutor(max_workers=6) as pool:
        list(pool.map(optimise, manifest))
    print(f'Regenerated {len(manifest)} company photographs and mobile derivatives.')
