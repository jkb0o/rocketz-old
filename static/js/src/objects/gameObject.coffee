class GameObject extends Kinetic.Group
  constructor: (options, data, center) ->
    @init(options)
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
    @setRotation(data.rot)
    @userData = data

  getLayerObject: ->
      return @

app.objects.GameObject = GameObject
