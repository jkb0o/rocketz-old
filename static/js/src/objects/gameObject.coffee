class GameObject extends Kinetic.Group
  parseConfig: (config, allowedOptions) ->
    newConfig = {}
    newConfig[option] = config[option] for option in allowedOptions when config[option]?
    return newConfig

  constructor: (options, data, center) ->
    allowedOptions = [
      'x', 'y', 'offset',
      'visible', 'opacity',
      'listening',
      'id', 'name',
      'scale',
      'rotation', 'rotationDeg',
      'draggable', 'dragConstraint', 'dragBounds'
    ]
    @init(@parseConfig(options, allowedOptions))

    @oldAttributes = {
      data: data,
      options: options,
      center: center
    }
    @data = data;
    @isStatic = data.static;

    @userData = {
      pos: data.center.concat(data.angle),
      vel: [0, 0, 0],
      obj: data.id
    }

  move: (data) ->
    pos = app.utils.worldPoint(data.pos)
    @worldx = pos[0]
    @worldy = pos[1]
    @setX(pos[0])
    @setY(pos[1])
    @setRotation(data.rot)
    @userData = data

  getLayerObject: ->
    return @

app.classes.objects.GameObject = GameObject
