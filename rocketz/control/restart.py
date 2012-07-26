from ..daemon import Daemon
from . import Arg, Help

@Help("Restarts rocketz battle server")
def execute(options):
    daemon = Daemon()
    if daemon.stop():
        daemon.start()
