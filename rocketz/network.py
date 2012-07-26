import gevent
from ws4py.server.geventserver import WebSocketServer
from ws4py.websocket import WebSocket

from .conf import settings


def run_server():
    host, port = settings.LISTEN.split(':')
    port = int(port)
    server = WebSocketServer((host, port), websocket_class=Dispatcher)
    server.serve_forever()


class Dispatcher(WebSocket):

    def received_message(self, message):
        print "C> %s" % message
        self.send(message, binary=True)
    
