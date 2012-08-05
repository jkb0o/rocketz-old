import json

__all__ = [
    'notification',
    'parse'
]

def notification(message, **data):
    return json.dumps(dict(
        type='Notification',
        body=dict(
            content_type=message, 
            content=data
        )
    ))

def parse(data):
    return json.loads(data)
