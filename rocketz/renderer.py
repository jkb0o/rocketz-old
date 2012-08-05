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
            if game_obj.is_static:
                continue

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
        angular_diff = abs(self.angular_velocity - body.angularVelocity)
        linear_diff = (self.linear_velocity - body.linearVelocity).lengthSquared
        if angular_diff < 0.001 and linear_diff < 0.002:
            return

        vel = self.linear_velocity = body.linearVelocity.copy()
        avel = self.angular_velocity = body.angularVelocity

        if vel.lengthSquared < 0.0001:
            vel = box2d.vec2(0, 0)

        if abs(avel) < 0.0001:
            avel = 0

        message = "Object #%d position: (%0.3f, %0.3f)" % (
            self.obj.id,
            body.position[0],
            body.position[1]
        )

        print vel.tuple, avel, vel.lengthSquared

        msg = notification(
            "move", 
            obj=self.obj.id,
            pos=body.position.tuple,
            vel=vel.tuple,
            rot= -1 * body.angle,
            avel= -1 * avel
        )
        for client in clients:
            client.send(msg)
