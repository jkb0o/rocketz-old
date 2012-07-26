import gevent
from ws4py.server.geventserver import WebSocketServer
from ws4py.websocket import EchoWebSocket

from rocketz import settings


def run_server():
    host, port = settings.LISTEN.split(':')
    port = int(port)
    server = WebSocketServer((host, port), websocket_class=Dispatcher)
    server.serve_forever()


class Dispatcher(EchoWebSocket):
    pass
    
