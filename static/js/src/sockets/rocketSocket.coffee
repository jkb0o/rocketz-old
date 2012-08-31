class RocketSocket
  constructor: (@app, @socket = new WebSocket('ws://' + ROCKETZ_WEBSOCKET)) ->
    @socket.onopen = $.proxy(@onopen, @)
    @socket.onerror = $.proxy(@onerror, @)
    @socket.onmessage = $.proxy(@onmessage, @)

  onopen: (app) ->

  onerror: (app) ->

  onmessage: (message) ->
    data = JSON.parse(message.data)
    type = data.body.content_type
    content = data.body.content
    @app.dispatch(type, content)

  send: (data) ->
    @socket.send(JSON.stringify(data))

ns.classes.sockets.RocketSocket = RocketSocket