from importlib import import_module

def import_object(path):
    path, class_name = path.rsplit('.', 1)
    module = import_module(path)
    return getattr(module , class_name)



def nested_getattr(func, name, *args):
   '''Get attr for nested functions'''
   if len(args) > 1:
       raise TypeError('nested_getattr expected at most 3 arguments, got {0}'.format(2 + len(args)))
   nested = func
   while 1:
       if hasattr(nested, name):
           return getattr(nested, name)
       if getattr(nested, 'func_closure', None) is None:
           if args:
               return args[0]
           raise AttributeError(name)
       nested = nested.func_closure[0].cell_contents
