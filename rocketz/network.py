import json

import gevent
from ws4py.server.geventserver import WebSocketServer
from ws4py.websocket import WebSocket

clients = []

from .conf import settings
from .messaging import notification
from .physics import world
from .scene import scene


def run_server():
    host, port = settings.LISTEN.split(':')
    port = int(port)
    server = WebSocketServer((host, port), websocket_class=Dispatcher)
    return gevent.spawn(server.serve_forever)


class Dispatcher(WebSocket):
    
    scene_listeners = []
    obj = None
    
    def opened(self):
        clients.append(self)

        import random
        obj = scene.create_object('rocketz.game.Spaceship', pos=(10,8))
        self.obj = obj
        obj.session = self

        # tell client which object is himself
        self.send(notification("identify", obj=obj.id))

        # tell client all about world itself
        scene.explain(self.obj)

    def closed(self, code, reason="Not defined"):
        print "Client %s closed connection (%d, reason: %s)" % (self, code, reason)
        clients.remove(self)
        if self.obj:
            self.obj.remove()
            del self.obj

    def received_message(self, message):
        print "[%d] C> %s" % (id(self), message)
        message = json.loads(str(message))
        if message['message'] == 'changeKeys':
            self.obj.keys = message['data']
            if self.obj.keys & self.obj.KEY_S:
                self.obj.shoot_required = True
        #self.send(message, binary=True)

    def send(self, message, binary=False):
        print "[%d] S> %s" % (id(self), message)
        return super(Dispatcher, self).send(message, binary)
