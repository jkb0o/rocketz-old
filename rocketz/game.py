from math import sin, cos, acos

from .scene import scene, GameObject
from .physics import box2d, world

class Spaceship(GameObject):
    """
    A spaceship controlled by user
    """

    BACK_FORCE = -0.5
    BACK_TORQUE = -0.3
    FORCE_VALUE = 4.0
    TORQUE_VALUE = 1.5
    ANTIGRAVITY = 0.0, 0.8
    
    fixture_property = dict(shape=[
        (0.8, 0), 
        (-0.6, 0.6),
        (-0.6, -0.6)
    ], density=0.3, friction=0.9)


    def update(self, delta):
        # maximum angular and linear velocity
        # using backforces
        self.body.ApplyForceToCenter(self.BACK_FORCE * self.body.linearVelocity)
        self.body.ApplyTorque(self.BACK_TORQUE * self.body.angularVelocity)

        # antigravity
        self.body.ApplyForceToCenter(box2d.vec2(*self.ANTIGRAVITY))

        if not self.keys: return
        
        if self.keys & self.KEY_A:
            self.body.ApplyTorque(self.TORQUE_VALUE)
        elif self.keys & self.KEY_D:
            self.body.ApplyTorque(-1 * self.TORQUE_VALUE)

        
        if self.keys & self.KEY_W:
            force = box2d.vec2()
            force.x = cos(self.body.angle)
            force.y = sin(self.body.angle)
            force *= self.FORCE_VALUE
            self.body.ApplyForceToCenter(force)

class Wall(GameObject):
    
    is_static = True

    def __init__(self, pos, size):
        self.fixture_property = dict(
            shapes=(box2d.polygonShape(box=size))
        )
        super(Wall, self).__init__(pos)

    @classmethod
    def chain(cls, vertices, width=1, closed=False):
        
        result = []
        minx, miny, maxx, maxy = 1000, 1000, -1000, -1000
        for i in range(len(vertices)):
            pos1 =  vertices[i]
            if i == len(vertices)-1:
                if not closed:
                    break
                else:
                    pos2 = vertices[0]
            else:
                pos2 = vertices[i+1]

            if not isinstance(pos1, box2d.vec2):
                pos1 = box2d.vec2(*pos1)
            if not isinstance(pos2, box2d.vec2):
                pos2 = box2d.vec2(*pos2)

            center = (pos2 + pos1) * 0.5
            center_vec = pos2 - pos1
            size = center_vec.length * 0.5, width*0.5
            center_vec.Normalize()
            angle = acos(center_vec.x)
            wall = scene.create_object("rocketz.game.Wall", center, size)
            result.append(wall)
            wall.body.angle = angle
            bounds = wall.body.fixtures[0].GetAABB(0)
            for bound in bounds.lowerBound, bounds.upperBound:
                minx, miny = min(minx, bound.x), min(miny, bound.y)
                maxx, maxy = max(maxx, bound.x), max(maxy, bound.y)

        return [(minx, miny), (maxx, maxy)], result



            

