from construct import *

from .messages import mappings, definitions

__all__ = [
    'notification',
    'Message'
]


def notification(message, **data):
    cnt = Container(
        type="Notification",
        body=Container(
            content_type=message,
            content=Container(**data)
        )
    )
    return Message.build(cnt)

def parse(data):
    return Message.parse(data)
        

Notification = Struct("notification",
    Enum(Byte("content_type"), **mappings),
    Switch("content", lambda c: c.content_type, definitions)
)

Request = Struct("request",
    Byte("code"),
    Embed(Notification)
)

Response = Struct("request",
    Byte("code"),
    Embed(Notification)
)

Message = Struct("message",
    Enum(Byte("type"),
        Request = 1,
        Notification = 2
    ),
    Switch("body", lambda c: c.type, dict(
        Request = Request,
        Notification = Notification
    ))
)
