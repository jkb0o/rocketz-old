import importlib
import os

from . import Help
from ..utils import nested_getattr

@Help("Show rocketz server avaible commands")
def execute(options):
    cmd_dir = os.path.dirname(os.path.abspath(__file__))
    for fname in sorted(os.listdir(cmd_dir)):
        if fname.startswith('_'): continue
        if not fname.endswith('.py'): continue
        fname = fname.replace('.py', '')
        module = importlib.import_module('rocketz.control.%s' % fname)
        if not hasattr(module, 'execute'): continue
        
        argparser = nested_getattr(module.execute, 'argparser', None)
        description = argparser.description if argparser else ''
        print "* %-15s - %s" % (fname, description)

