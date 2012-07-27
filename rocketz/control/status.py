from ..launcher import Launcher
from . import Arg, Help

@Help("Show status of the rocketz battle server")
def execute(options):
    print Launcher().status()
