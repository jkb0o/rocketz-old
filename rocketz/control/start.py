from ..launcher import Launcher
from . import Arg, Help

@Help("Start rocketz battle server")
@Arg("--daemon", action="store_true", help="daemonize")
@Arg("-d", action="store_true", help="daemonize")
def execute(options):
    launcher = Launcher()
    launcher.start(detach = options.d or options.daemon)
