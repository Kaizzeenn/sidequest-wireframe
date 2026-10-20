"""Serve SIDEQUEST locally so online tiles receive a normal website referrer."""
import argparse
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
import webbrowser

class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        super().end_headers()

def main():
    parser = argparse.ArgumentParser(description='Start the SIDEQUEST classroom demo')
    parser.add_argument('--no-browser', action='store_true')
    parser.add_argument('--port', type=int, default=8765)
    args = parser.parse_args()
    handler = functools.partial(Handler, directory=str(Path(__file__).resolve().parent))
    try:
        server = ThreadingHTTPServer(('127.0.0.1', args.port), handler)
    except OSError:
        server = ThreadingHTTPServer(('127.0.0.1', 0), handler)
    url = f'http://127.0.0.1:{server.server_address[1]}/index.html'
    print(f'\nSIDEQUEST: {url}\nKeep this window open. Press Ctrl+C to stop.\n', flush=True)
    if not args.no_browser:
        threading.Timer(0.4, webbrowser.open, args=(url,)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()

if __name__ == '__main__':
    main()
