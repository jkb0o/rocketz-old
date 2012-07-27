from ..launcher import Launcher
from . import Arg, Help

@Help("Stop rocketz battle server")
def execute(options):
    Launcher().stop()
