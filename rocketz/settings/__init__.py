"""
rocketz.settings module
Holds project configurations in django style.
Usage:
    from rocketz import settings
    if settings.DEBUG:
        print "There is some debug message"

Default settings located at rocketz.settings.default
rocketz.settings.local will override all other settings

You can change location of default settings by changing
environ variable `ROCKETZ_CONFIG`, for example:
    sys.environ['ROCKETZ_CONFIG'] = 'some.testing.configuration'
"""
from os import environ, path
from importlib import import_module
import sys


current_module = sys.modules['rocketz.settings']
required_module = import_module(environ.get('ROCKETZ_CONFIG', 'rocketz.settings.default'))

for key, val in required_module.__dict__.items():
    if key.startswith('_'): continue
    setattr(current_module, key, val)


# it is better then try except ImportError
if path.exists(path.join(path.dirname(path.abspath(__file__)), 'local.py')):
    from .local import *

# cleanup
for key, val in current_module.__dict__.items():
    if key == 'sys': continue
    if key.startswith('_') or key[0].upper() != key[0]:
        delattr(sys.modules['rocketz.settings'], key)
del sys, key, val


