from .physics import world

scene = {}

class GameObject(object):
    
    """
    Do not create body if create_body = False
    GameObject still have id and can be explaned
    """
    create_body = True

    """
    This attributes will be passed to body.CreatePolygonFixture
    """
    fixture_property = dict(box=(1,1), density=1, friction=0.3)

    """
    currently it only can by rocketz.renderer.NetworkRenderer
    """
    renderer = None

    _last_id = 1
    def __init__(self, *args, **kwargs):
        # init body
        if self.create_body:
            self.body = world.CreateDynamicBody(userData=self)
            self.body.CreatePolygonFixture(**self.fixture_property)

        
        # generate unique id
        self.id = GameObject._last_id
        GameObject._last_id += 1

        # add to scene
        scene[self.id] = self



