import gevent
from ws4py.server.geventserver import WebSocketServer

from ws import Dispatch

HANDSHAKEN	= False

HOST		= "10.1.22.71"
PORT		= 31338

server = WebSocketServer((HOST, PORT), websocket_class=Dispatch)
server.serve_forever()


