from .event import Eventable
from .network import clients
from .messaging import notification
from .physics import world, box2d
from .utils import import_object

class Scene(Eventable):
    
    def __init__(self):
        super(Scene, self).__init__()
        self.objects = {}
        self.classes = {}

    def create_object(self, cls, *args, **kwargs):
        """
        Factory method.
        Usage:
            obj = scene.create_object('rocketz.scene.GameObject')
        """
        if cls not in self.classes:
            self.classes[cls] = import_object(cls)

        obj = self.classes[cls](*args, **kwargs)
        self.add_object(obj)

        return obj


    def add_object(self, obj):
        """
        Add object to scene
        Object should be instance of GameObject
        """
        if not isinstance(obj, GameObject):
            raise TypeError("Unable to add %s to scene" % obj)

        # tell anyone object created
        msg = notification("obj_created", **obj.explain)
        for client in clients:
            client.send(msg)

        self.objects[obj.id] = obj

    def explain(self, obj, full=False):
        """
        Tells to the object everything about scene
        If full = True explain object itself too
        """
        session = obj.session
        lower, upper = world.bounds
        session.send(notification("world_info", 
            lower_bound = lower,
            upper_bound = upper
        ))

        for go in self:
            if not full and go==obj: continue

            msg = notification("obj_created", **go.explain)
            print "Send explain about ", go.id
            session.send(msg)

    def remove_object(self, obj):
        del self.objects[obj.id]
        world.DestroyBody(obj.body)
        obj.body = None

        # tell anyone obj removed
        msg = notification("obj_removed", obj=obj.id)
        for client in clients:
            client.send(msg)

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
    Should it be dynamic or static
    """
    is_static = False

    """
    This attributes will be passed to body.CreatePolygonFixture
    """
    fixture_property = dict(box=(0.5,0.5), density=0.2, friction=0.9)

    """
    currently it only can by rocketz.renderer.NetworkRenderer
    """
    renderer = None

    linear_damping = 0
    angular_damping = 0


    # remove keys from here to child class
    keys = 0
    KEY_W = 0b0001
    KEY_A = 0b0010
    KEY_S = 0b0100
    KEY_D = 0b1000
    
    # read only
    shape_type = 'poly' # or circle

    _last_id = 1
    def __init__(self, pos=(0,0)):
        super(GameObject, self).__init__()
        # init body
        if self.create_body:
            if self.is_static:
                self.body = world.CreateStaticBody(**self.fixture_property)
            else:
                self.body = world.CreateDynamicBody(
                    userData=self,
                    linearDamping=self.linear_damping,
                    angularDamping=self.angular_damping,
                )
                kwargs = self.fixture_property.copy()
                if 'box' in kwargs:
                    kwargs['shape'] = box2d.polygonShape(box=kwargs['box'])
                    del kwargs['box']
                elif 'shape' in kwargs:
                    kwargs['shape'] = box2d.polygonShape(vertices=kwargs['shape'])
                elif 'radius' in kwargs:
                    kwargs['shape'] = box2d.circleShape(radius=kwargs['radius'])
                    del kwargs['radius']
                    self.shape_type = 'circle'
                    
                self.body.CreatePolygonFixture(**kwargs)

            self.body.position = pos

        # generate unique id
        self.id = GameObject._last_id
        GameObject._last_id += 1

    def remove(self):
        """
        Remove object from scene
        """
        scene.remove_object(self)


    def update(self, delta):
        pass

    @property
    def explain(self):
        """
        Helper for explaining physics properties"
        """
        b = self.body
        res = dict(
            id=self.id,
            static=self.is_static,
            center=b.position.tuple,
            angle=-1*b.angle
        )
        if self.shape_type == 'poly':
            res['shape_type'] = 'poly'
            res['shape_options']=b.fixtures[0].shape.vertices
        else:
            res['shape_type'] = 'circle'
            res['shape_options'] = b.fixtures[0].shape.radius

        return res

scene = Scene()
