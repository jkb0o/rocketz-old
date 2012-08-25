class SpaceShip extends app.classes.objects.GameObject
  constructor: (options, data, center) ->
    super(options, data, center)
    @buildShip()
    @buildEmitter()

  buildShip: (options) ->
    ship = new Kinetic.Image({
      image: $('#spaceship')[0],
      offset: { x: 42, y: 42 },
      fill  : "rgba(255, 255, 255, 0.0)"
    })
    @add(ship)

  buildEmitter: (options) ->
    emitter = new Kinetic.Emitter({
      name: 'smokeEmitter',
      particleType: 'Sprite',
      world: app.application.layers.battle,
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
    @add(emitter)
    emitter.start()

app.classes.objects.SpaceShip = SpaceShip