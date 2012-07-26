from ..daemon import Daemon
from . import Arg, Help

@Help("Stop rocketz battle server")
def execute(options):
    Daemon().stop()
