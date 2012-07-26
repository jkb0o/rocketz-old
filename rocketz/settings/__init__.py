from os import path

from .default import *

# it is better then try except ImportError
if path.exists(path.join(path.dirname(path.abspath(__file__)), 'local.py')):
    from .local import *
