from ..conf import settings

protocol = getattr(settings, 'PROTOCOL', 'json')

if protocol == 'json':
    from .js import *
elif protocol == 'binary':
    from .binary import *
elif protocol == 'validate':
    from .validate import *
else:
    raise ValueError('Unknown protocol: %s' % protocol)
