"""Bundle local SIDEQUEST assets into one HTML file without changing script order."""
from pathlib import Path
import re
import sys
ROOT = Path(__file__).resolve().parent.parent
TARGET = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / 'index.html'
html = (ROOT / 'source.html').read_text()
def stylesheet(match):
    content = (ROOT / match[1]).read_text()
    # Raster layer controls are unused; report markers use inline div icons.
    content = re.sub(r'url\(images/[^)]+\)', 'none', content)
    return '<style>\n' + content + '\n</style>'
def script(match):
    content = (ROOT / match[1]).read_text().replace('</script', '<\\/script')
    return '<script>\n' + content + '\n</script>'
html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', stylesheet, html)
html = re.sub(r'<script src="([^"]+)"></script>', script, html)
TARGET.parent.mkdir(parents=True, exist_ok=True)
TARGET.write_text(html)
print(TARGET)
