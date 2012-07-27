import gevent
from ws4py.server.geventserver import WebSocketServer
from ws4py.websocket import WebSocket

from .conf import settings
from .physics import world
from .scene import GameObject

clients = []

def run_server():
    host, port = settings.LISTEN.split(':')
    port = int(port)
    server = WebSocketServer((host, port), websocket_class=Dispatcher)
    return gevent.spawn(server.serve_forever)


class Dispatcher(WebSocket):
    
    def __init__(self, *args, **kwargs):
        super(Dispatcher, self).__init__(*args, **kwargs)
        clients.append(self)

    def opened(self):
        for x in (2,3,4):
            obj = GameObject()
            obj.body.position = x, x
    
    def received_message(self, message):
        print "C> %s" % message
        self.send(message, binary=True)
