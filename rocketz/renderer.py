import time

import gevent

from .conf import settings
from .messaging import notification
from .network import clients
from .physics import box2d
from .scene import scene

def network():
    """
    Starts render job rocketz.scene changes to connected clients
    """
    return gevent.spawn(render_network)

def render_network():
    time_delta = 0.01
    start = time.time()
    while True:
        # job code
        for game_obj in scene:
            if not game_obj.renderer:
                game_obj.renderer = NetworkRenderer(game_obj)

            game_obj.renderer.render()

        # waitings
        done = time.time()
        time_spend = done - start
        sleep_time = max(0, 1.0/settings.RENDER_NETWORK_ITERATIONS - time_spend)
        gevent.sleep(sleep_time)
        time_delta = time.time() - start
        start += time_delta


class NetworkRenderer(object):
    def __init__(self, obj):
        self.obj = obj
        # remember last velocity to detect do we need to send syncs
        self.linear_velocity = box2d.vec2()
        self.angular_velocity = 0

    def render(self):
        body = self.obj.body
        if (self.linear_velocity - body.linearVelocity).lengthSquared < 0.001:
            return
        
        self.linear_velocity = body.linearVelocity.copy()
        message = "Object #%d position: (%0.3f, %0.3f)" % (
            self.obj.id,
            body.position[0],
            body.position[1]
        )
        
        msg = notification(
            "move", 
            obj=self.obj.id,
            pos=[
                body.position[0], 
                body.position[1],
                
            ],
            vel=[
                body.linearVelocity[0], 
                body.linearVelocity[1],
            ],
            rot=body.angle,
            avel=body.angularVelocity
        )
        for client in clients:
            client.send(msg)
