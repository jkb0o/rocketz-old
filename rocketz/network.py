import json

import gevent
from ws4py.server.geventserver import WebSocketServer
from ws4py.websocket import WebSocket

from .conf import settings
from .physics import world
from .scene import scene

clients = []

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

        self.scene_listeners = [
            scene.add_listener('object_added', self.notify_creation),
            scene.add_listener('object_removed', self.notify_remove),
        ]

        import random
        position = 1 + 5 * random.random(), 1 + 5 * random.random()
        obj = scene.create_object('rocketz.scene.GameObject')
        obj.body.position = position
        obj.body.ApplyTorque(20 - 40*random.random())
        self.obj = obj

    def closed(self, code, reason="Not defined"):
        print "Client %s closed connection (%d, reason: %s)" % (self, code, reason)
        for listener in self.scene_listeners:
            scene.clear_listener(listener)
        clients.remove(self)
        if self.obj:
            self.obj.remove()
            del self.obj

    def send(self, msg, **kwargs):
        data = json.dumps(dict(message=msg, data=kwargs))
        super(Dispatcher, self).send(data)
        
    
    def received_message(self, message):
        print "C> %s" % message
        #self.send(message, binary=True)

    def notify_creation(self, obj):
        self.send("obj_created", id=obj.id)

    def notify_remove(self, obj):
        self.send("obj_removed", id=obj.id)
