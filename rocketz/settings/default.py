import os
import logging

HOME = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../..')

PID_FILE = os.path.join(HOME, 'tmp/rocketz.pid')

APPLICAION_JOBS = [
    'rocketz.network.run_server',
    'rocketz.physics.start_simulation',
]

LISTEN = 'localhost:31337'

LOG_FILE = os.path.join(HOME, 'tmp/rocketz.log')
LOG_LEVEL = logging.DEBUG
LOG_FORMAT = '%(asctime)s:%(levelname)s:%(name)s:%(message)s'

PHYSICS_ITERATIONS = 15.0       # Number of physics iterations per second
PHYSICS_ITERATIONS_VEL = 6      # Number of velocity iterations inside 1 physics iteration
PHYSICS_ITERATIONS_POS = 2      # Number of position iteration inside 1 physics iteration
