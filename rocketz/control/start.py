from ..launcher import Launcher
from . import Arg, Help

@Help("Start rocketz battle server")
@Arg("--daemon", "-d", action="store_true", help="daemonize")
def execute(options):
    launcher = Launcher()
    launcher.start(detach = options.daemon)
