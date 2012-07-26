from ..daemon import Daemon
from . import Arg, Help

@Help("Start rocketz battle server")
@Arg("--fg", action="store_true", help="Run in foreground, no daemonize")
def execute(options):
    daemon = Daemon()
    daemon.start(detach = not options.fg)
