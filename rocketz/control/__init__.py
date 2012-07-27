"""
rocketz/control contain scripts which be used by rctl tool.
To execute rocketz/control/start.py you need to call:
> ./rctl rs start

Help() and Arg() decorators used to simplify definitoion of 
argparse module. Look at start command. It accepts --fg 
argument from command line ( ./rctl rs start --fg )
"""
import argparse
from functools import wraps

from ..utils import nested_getattr

class Decorator(object):

    def init_parser(self, f):
        argparser = nested_getattr(f, 'argparser', None)
        if not argparser:
            argparser = f.argparser = argparse.ArgumentParser(
                add_help=True
            )
            @wraps(f)
            def wraped(command, args):
                f.argparser.prog = 'rctl rs ' + command
                options = f.argparser.parse_args(args)
                return f(options)

        else:
            wraped = f

        return argparser, wraped

class Help(Decorator):
    def __init__(self, text):
        self.text = text

    def __call__(self, f):
        argparser, wraped = self.init_parser(f)
        argparser.description = self.text
        return wraped

class Arg(Decorator):
    def __init__(self, *args, **kwargs):
        self.args = args
        self.kwargs = kwargs

    def __call__(self, f):
        argparser, wraped = self.init_parser(f)
        argparser.add_argument(*self.args, **self.kwargs)
        return wraped
