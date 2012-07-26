from ..daemon import Daemon
from . import Arg, Help

@Help("Show status of the rocketz battle server")
def execute(options):
    print Daemon().status()
