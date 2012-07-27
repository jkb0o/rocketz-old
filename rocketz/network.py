import gevent
from ws4py.server.geventserver import WebSocketServer
from ws4py.websocket import WebSocket

from .conf import settings
from .physics import world


def run_server():
    host, port = settings.LISTEN.split(':')
    port = int(port)
    server = WebSocketServer((host, port), websocket_class=Dispatcher)
    return gevent.spawn(server.serve_forever)


class Dispatcher(WebSocket):
    
    body = None
    box = None
    def opened(self):
        body = world.CreateDynamicBody(position=(0, 4))
        box = body.CreatePolygonFixture(box=(1,1), density=1, friction=0.3)
        self.body = body
        self.box = box
        gevent.spawn(self.notify_position)


    def received_message(self, message):
        print "C> %s" % message
        self.send(message, binary=True)

    def notify_position(self):
        vx, vy = 1, 1
        while vx or vy:
            x, y = self.body.position
            self.send("Position: %0.3f, %0.3f" % (x,y))
            gevent.sleep(0.1)
            vx, vy = self.body.linearVelocity
