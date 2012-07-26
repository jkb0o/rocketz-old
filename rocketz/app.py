from .utils import load_class
from .conf import settings

def launch():
    from gevent import monkey
    monkey.patch_all()

    for job_name in settings.APPLICAION_JOBS:
        job = load_class(job_name)
        job()
