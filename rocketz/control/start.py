from ..launcher import Launcher
from . import Arg, Help

@Help("Start rocketz battle server")
@Arg("--fg", action="store_true", help="Run in foreground, no daemonize")
def execute(options):
    launcher = Launcher()
    launcher.start(detach = not options.fg)
