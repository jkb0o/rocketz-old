import os

HOME = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../..')

PID_FILE = os.path.join(HOME, 'tmp/rocketz.pid')

APPLICAION_JOBS = [
    'rocketz.network.run_server',
    'rocketz.pyisics.start_simulation',
]

LISTEN = 'localhost:31337'
