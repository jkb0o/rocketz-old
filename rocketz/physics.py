import time

import gevent
import Box2D
from Box2D import b2 as box2d


world = box2d.world()
world.CreateStaticBody(
    position=(10, -1),
    shapes=(box2d.polygonShape(box=(10,1)))
)
world.CreateStaticBody(
    position=(10, 13),
    shapes=(box2d.polygonShape(box=(10,1)))
)
world.CreateStaticBody(
    position=(21, 6),
    shapes=(box2d.polygonShape(box=(1,6)))
)
world.CreateStaticBody(
    position=(-1, 6),
    shapes=(box2d.polygonShape(box=(1,6)))
)

from .conf import settings
from .scene import scene

def start_simulation():
    return gevent.spawn(simulate)
    

def simulate():
    time_delta = 0.01
    start = time.time()
    while True:
        do_simulate_step(time_delta)
        done = time.time()
        time_spend = done - start
        sleep_time = max(0, 1.0/settings.PHYSICS_ITERATIONS - time_spend)
        gevent.sleep(sleep_time)
        time_delta = time.time() - start
        start += time_delta
        #print "Time delta: %0.3f" % time_delta

def do_simulate_step(time_delta):
    for game_obj in scene:
        game_obj.update(time_delta)

    world.Step(time_delta, settings.PHYSICS_ITERATIONS_VEL, settings.PHYSICS_ITERATIONS_POS)
    world.ClearForces()
