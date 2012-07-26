"""
rocketz.conf module
Manages project configurations in django style.
Usage:
    from rocketz.conf import settings
    if settings.DEBUG:
        print "There is some debug message"

Default settings located at rocketz.settings module

You can change location of default settings by changing
environ variable `ROCKETZ_CONFIG`, for example:
    sys.environ['ROCKETZ_CONFIG'] = 'some.testing.configuration'
"""
from os import environ
from importlib import import_module
import sys

class Settings(object):
    pass

settings = Settings


required_module = import_module(environ.get('ROCKETZ_CONFIG', 'rocketz.settings'))

for key, val in required_module.__dict__.items():
    if key.startswith('_'): continue
    setattr(settings, key, val)
    delattr(required_module, key)
