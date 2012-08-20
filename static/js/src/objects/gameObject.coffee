class GameObject
  constructor: (options, data, center) ->
    @object = new Kinetic.Group(options);
    @object.gameObject = @
    @object.oldAttributes = {
      data: data,
      options: options,
      center: center
    }
    @object.data = data;
    @object.isStatic = data.static;
    @object.userData = {
      pos: data.center.concat(data.angle),
      vel: [0, 0, 0],
      obj: data.id
    }

  move: (data) ->
    pos = app.utils.worldPoint(data.pos)
    @object.worldx = pos[0]
    @object.worldy = pos[1]
    @object.setRotation(data.rot)
    @object.userData = data

  getLayerObject: ->
      return @object

class SpaceShip extends GameObject
  constructor: (options, data, center) ->
    super(options, data, center)
    @buildShip()
    @buildEmitter()

  buildShip: (options) ->
    ship = new Kinetic.Image({
      image: $('#spaceship')[0],
      offset: { x: 42, y: 42 },
      fill  : "rgba(255, 255, 255, 0.0)"
    });
    @object.add(ship)

  buildEmitter: (options) ->
    emitter = new Kinetic.Emitter({
      name: 'smokeEmitter',
      particleType: 'Sprite',
      world: app.layers.battle,
      x: -40, y: 0,
      lifeTime: [0.5, 2.5],
      linearVelocity: [0,100],
      particlesPerSecond: 3,
      particleRotation: [Math.PI*0.8, Math.PI*1.2],
      angularVelocity: [-Math.PI, Math.PI],
      alphaFrom: [0.5,1.0],
      alphaTo: [0, 0.0],
      scaleFrom: [1.0,1.6],
      scaleTo: [2.5, 5.5],
      playAnimation: false,
      randomFrame: true,
      relativeVelocity: false,
      particleArgs: {
        offset: { x: 10, y: 10 },
        alpha: 0,
        image: $('#smoke')[0],
        animation: 'main',
        animations: {
          main: [
            { x: 0, y:0, width: 20, height: 20 },
            { x: 20, y: 0, width: 20, height: 20 },
            { x: 40, y: 0, width: 20, height: 20 },
            { x: 60, y: 0, width: 20, height: 20 }
          ]
        }
      }
    })
    @object.add(emitter)
    emitter.start()

class Polygon extends GameObject
  constructor: (options, data, center) ->
    super(options, data, center)
    options.points = app.utils.shape(data.shape_options);
    @object.add(new Kinetic.Polygon(options))

class Ellipse extends GameObject
  constructor: (options, data, center) ->
    super(options, data, center)
    options.radius = app.utils.radius(data.shape_options);
    @object.add(new Kinetic.Ellipse(options))


app.objects.SpaceShip = SpaceShip
app.objects.Polygon = Polygon
app.objects.Ellipse = Ellipse