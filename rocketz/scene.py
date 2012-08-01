from math import sin, cos
from weakref import WeakSet

from .event import Eventable
from .physics import world, box2d
from .utils import import_object

class Scene(Eventable):
    
    def __init__(self):
        super(Scene, self).__init__()
        self.objects = {}
        self.classes = {}

    def create_object(self, cls):
        """
        Factory method.
        Usage:
            obj = scene.create_object('rocketz.scene.GameObject')
        """
        if cls not in self.classes:
            self.classes[cls] = import_object(cls)

        obj = self.classes[cls]()
        self.add_object(obj)

        return obj


    def add_object(self, obj):
        """
        Add object to scene
        Object should be instance of GameObject
        """
        if not isinstance(obj, GameObject):
            raise TypeError("Unable to add %s to scene" % obj)

        self.objects[obj.id] = obj
        self.fire_event("object_added", obj=obj)

    def remove_object(self, obj):
        obj.fire_event("before_remove")
        del self.objects[obj.id]
        world.DestroyBody(obj.body)
        obj.body = None
        self.fire_event("object_removed", obj=obj)
        obj.fire_event("after_remove")

    def __iter__(self):
        for obj in self.objects.values():
            yield obj

class GameObject(Eventable):
    
    """
    Do not create body if create_body = False
    GameObject still have id and can be explaned
    """
    create_body = True

    """
    This attributes will be passed to body.CreatePolygonFixture
    """
    fixture_property = dict(box=(0.5,0.5), density=0.2, friction=0.9)

    """
    currently it only can by rocketz.renderer.NetworkRenderer
    """
    renderer = None


    # remove keys from here to child class
    keys = 0
    KEY_W = 0b0001
    KEY_A = 0b0010
    KEY_S = 0b0100
    KEY_D = 0b1000

    _last_id = 1
    def __init__(self):
        super(GameObject, self).__init__()
        # init body
        if self.create_body:
            self.body = world.CreateDynamicBody(userData=self)
            self.body.CreatePolygonFixture(**self.fixture_property)

        # generate unique id
        self.id = GameObject._last_id
        GameObject._last_id += 1

    def remove(self):
        """
        Remove object from scene
        """
        scene.remove_object(self)


    def update(self, delta):
        # maximum angular and linear velocity
        # using backforces
        self.body.ApplyForceToCenter(-0.2 * self.body.linearVelocity)
        self.body.ApplyTorque(-0.5 * self.body.angularVelocity)

        # antigravity
        self.body.ApplyForceToCenter(box2d.vec2(0, 1))

        if not self.keys: return
        
        if self.keys & self.KEY_A:
            self.body.ApplyTorque(-1.5)
        elif self.keys & self.KEY_D:
            self.body.ApplyTorque(1.5)

        
        if self.keys & self.KEY_W:
            force = box2d.vec2()
            force.x = cos(self.body.angle)
            force.y = -sin(self.body.angle)
            force *= 5
            self.body.ApplyForceToCenter(force)


scene = Scene()
