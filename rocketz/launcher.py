import errno
import logging
import os
import signal
import sys
import time

import gevent

from .conf import settings
from .utils import import_object

class Launcher(object):
    
    def __init__(self):
        pass

    def start(self, detach=True):
        """
        Checks if daemon not already started.
        Forks, write pid, redirects stdout and 
        stderr to logging and run application.

        Run application only if detach=False
        """

        if not detach:
            self.do_start()
        if self.is_running():
            print "Rocketz already started (pid %s)" % self.pid
            return

        pid = os.fork()
        if pid:
            # master process
            self.write_pid(pid)
            print "Rocketz started (pid %s)" % pid
        else:
            self.setup_logging()
            self.do_start()

    def do_start(self):
        from gevent import monkey
        monkey.patch_all()
        
        jobs = []
        for job_name in settings.APPLICAION_JOBS:
            runner = import_object(job_name)
            job = runner()
            if job is not None:
                jobs.append(job)
        gevent.joinall(jobs)
        raise RuntimeError("You should never be here")
        
    def setup_logging(self):
        logging.basicConfig(
            level=settings.LOG_LEVEL,
            format=settings.LOG_FORMAT,
            filename=settings.LOG_FILE,
            filemode='a'
        )

        stdout_logger = logging.getLogger('STDOUT')
        sl = StreamLogger(stdout_logger, logging.DEBUG)
        sys.stdout = sl
         
        stderr_logger = logging.getLogger('STDERR')
        sl = StreamLogger(stderr_logger, logging.ERROR)
        sys.stderr = sl

    def pid_file(self, mode='r'):
        pid_file = settings.PID_FILE
        if not os.path.exists(pid_file) and mode=='r':
            return None
        return open(pid_file, mode)
        

    def is_running(self):
        pid_file = self.pid_file()
        if not pid_file: return False
        pid = int(pid_file.read())
        self.pid = pid
        try:
            os.kill(pid, 0)
        except OSError, e:
            if e[0] == errno.ESRCH:
                return False
            raise
        else:
            return True

    def write_pid(self, pid):
        pid_dir = os.path.dirname(settings.PID_FILE)
        if not os.path.exists(pid_dir):
            os.makedirs(pid_dir)

        self.pid_file('w').write(str(pid))

    def stop(self):
        if not self.is_running():
            print "Rocketz not running"
            return True

        os.kill(self.pid, signal.SIGHUP)
        timeout = 3
        while timeout > 0 and self.is_running():
            time.sleep(0.3)
            timeout -= 0.3

        if timeout <= 0:
            print "Unable to stop rocketz daemon (pid %s)" % self.pid
            return False
        else:
            print "Rocketz stoped (pid %s)" % self.pid
            return True

    def status(self):
        if self.is_running():
            return "Rocketz is running (pid %s)" % self.pid
        else:
            return "Rocketz is down"
        

class StreamLogger(object):
   """
   Fake file-like stream object that redirects writes to a logger instance.
   """
   def __init__(self, logger, log_level=logging.INFO):
      self.logger = logger
      self.log_level = log_level
      self.linebuf = ''
 
   def write(self, buf):
      for line in buf.rstrip().splitlines():
         self.logger.log(self.log_level, line.rstrip())
