import time

import gevent
import Box2D
from Box2D import b2 as box2d

world = box2d.world()

from .conf import settings
from .scene import scene
from .game import Wall

def start_simulation():
    world.bounds, walls = Wall.chain([
        (0, 0),
        (20,0),
        (20,12),
        (0,12)
    ], width=1.0, closed=True)

    Wall.chain([
        (4, 8),
        (4, 4),
        (12, 4),
        (12, 8),
        (14, 10),
        (16, 10),
        (16, 5),
        (14.5, 5)
    ], width=0.3)
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
