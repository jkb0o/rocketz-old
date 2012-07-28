from weakref import WeakSet

class Eventable(object):
    
    _last_listener_id = 0

    def __init__(self):
        
        # event listeners
        # keys are strings (event names) and ints (listeners id)
        # for event names values are WeakSet of listeners
        # for listeners id - function wrappers
        # if we delete listener by id, it will removed
        # from WeakSet automaticly
        self._listeners = {}
    
    def add_listener(self, event_name, func):
        listener = lambda **options: func(**options)
        if event_name not in self._listeners:
            self._listeners[event_name] = WeakSet()

        self._listeners[event_name].add(listener)
        Eventable._last_listener_id += 1
        self._listeners[Eventable._last_listener_id] = listener
        return Eventable._last_listener_id

    def clear_listener(self, listener_id):
        if listener_id in self._listeners:
            del self._listeners[listener_id]

    def fire_event(self, event_name, **options):
        if event_name not in self._listeners:
            return
        for listener in self._listeners[event_name]:
            listener(**options)
