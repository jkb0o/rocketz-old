from ..launcher import Launcher
from . import Arg, Help

@Help("Restarts rocketz battle server")
def execute(options):
    launcher = Launcher()
    if launcher.stop():
        launcher.start()
