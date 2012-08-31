class Timer
  constructor: ()->
    @lastTimeStamp = null

  getDiff: ()->
    if not @lastTimeStmp
      @lastTimeStmp = new Date().getTime()
      return 0

    newTimeStamp = new Date().getTime()
    diff = newTimeStamp - @lastTimeStamp
    @lastTimeStamp = newTimeStamp
    return diff / 1000


class Utils
  constructor: () ->
    @timers = {}

  worldPoint: (data) ->
    point = @localPoint(data)
    point[1] = ns.config.world.height + point[1]
    return point


  localPoint: (data) ->
    point = [];
    point[0] = data[0] * ns.config.x_scale;
    point[1] = -data[1] * ns.config.y_scale;
    return point

  radius: (data) ->
    if data.length
      radius = []
      radius[0] = data[0] * ns.config.x_scale;
      radius[1] = data[1] * ns.config.y_scale;
      return radius
    else
      return data * ns.config.x_scale;

  velocity: (data) ->
    velocity = []
    velocity[0] = data[0] * ns.config.x_scale;
    velocity[1] = data[1] * ns.config.y_scale;
    return velocity

  shape: (data) ->
    shape = []

    for i in [0..data.length]
      shape = shape.concat(@localPoint(data[i]))

    return shape

  distance: (p1, p2) ->
    x_d = p1[0] - p2[0];
    y_d = p1[1] - p2[1];
    return x_d*x_d + y_d*y_d;

  getTimer: (name) ->
    timer = @timers[name]
    if not timer
      timer = new Timer()
      @timers[name] = timer
    return timer

ns.utils = new Utils( )