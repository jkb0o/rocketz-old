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
    
    def opened(self):
        clients.append(self)
        for x in (2,3,4):
            obj = GameObject()
            obj.body.position = x, x

    def closed(self, code, reason="Not defined"):
        print "Client closed connection (%d, reason: %s)" % (code, reason)
        clients.remove(self)
        
    
    def received_message(self, message):
        print "C> %s" % message
        self.send(message, binary=True)
