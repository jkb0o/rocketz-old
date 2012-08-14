import os
import time

import gevent
import Box2D
from Box2D import b2 as box2d
from lxml import objectify

world = box2d.world(gravity=(0,-10))

from .conf import settings
from .scene import scene
from .game import Wall

def start_simulation():
    import Box2D
    world.bounds, shapes = shapes_from_svg()
    for shape in shapes:
        #shape = box2d.polygonShape(vertices=shape)
        obj = scene.create_object('rocketz.game.ChainShape', shape)

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


def shapes_from_svg():
    level_file = os.path.join(settings.HOME, 'levels/level01.svg')
    with open(level_file, 'r') as sf:
        root = objectify.parse(sf).getroot()


    lower_x, lower_y, upper_x, upper_y = [float(i) for i in root.get('viewBox').split(' ')]

    shapes = []

    for path in root.path:
        shape = []
        shapes.append(shape)
        last = ''
        last_point = None
        for point in path.get('d').split(' '):
            if not point or point in 'MCZ':
                continue
            if point == last:
                continue
            last = point

            x, y = [float(i) for i in point.split(',')]
            x = x / 50.0
            y = (upper_y - y) / 50.0

            if last_point:
                xl, yl = last_point
                if (xl-x)**2 + (yl-y)**2 < box2d.linearSlop**2:
                    continue

            last_point = x, y
                    

            
            shape.append((x, y))
        if (x - shape[-1][0])**2 + (y - shape[-1][1])**2 < box2d.linearSlop:
            shape.pop()

    lower = lower_x / 50.0, lower_y / 50.0
    uppwer = upper_x / 50.0, upper_y / 50.0
    return [lower, uppwer], shapes
