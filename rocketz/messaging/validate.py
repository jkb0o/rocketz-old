"""
Validate protocol.
It is json protocol, but build bessages too and 
check they are same
"""

from . import js, binary

__all__ = [
    'notification',
    'parse'
]

def validate(js_msg, bin_msg):
    #print "Validating protocol messages"
    #print js_msg
    #print bin_msg
    pool_js = [js_msg]
    pool_bin = [bin_msg]
    while pool_js and pool_bin:
        item_js = pool_js.pop(0)
        item_bin = pool_bin.pop(0)
        for key ,val_js in item_js.items():
            if key.startswith('_'): continue
            val_bin = item_bin[key]
            if hasattr(val_bin, 'items'):
                if not hasattr(val_js, 'items'):
                    raise ValueError("Items not same: %s and %s" % (val_bin, val_js))
                pool_bin.append(val_bin)
                pool_js.append(val_js)
            else:
                if val_bin != val_js:
                    raise ValueError("Items not same: %s and %s" % (val_bin, val_js))

    return True

def notification(message, **data):
    # check binary is builded
    bin_msg = binary.notification(message, **data)
    js_msg = js.notification(message, **data)
    js_parsed = js.parse(js_msg)
    bin_parsed = binary.parse(bin_msg)
    validate(js_parsed, bin_parsed)
    validate(bin_parsed, js_parsed)
    return js_msg


def parse(data):
    js_msg = js.parse(data)
    return js_msg
