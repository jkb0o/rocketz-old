import json

def notification(message, **data):
    return json.dumps(dict(message=message, data=data))
    
