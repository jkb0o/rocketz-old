from ..conf import settings

protocol = getattr(settings, 'PROTOCOL', 'json')

if protocol in ['json', 'js']:
    from .js import *
elif protocol == 'binary':
    from .binary import *
elif protocol == 'validate':
    from .validate import *
else:
    raise ValueError('Unknown protocol: %s' % protocol)
