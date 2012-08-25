class SpaceShip extends app.objects.GameObject
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
    emitter = Kinetic.ParticleEmitter.fromConfig
      name: 'smokeEmitter'
      world: app.layers.battle
      particlesPerSecond: 3
      poolSize: 150
      x: -40, y: 0
      particleConfig:
        lifeTime: [0.5, 2.5]
        linearVelocity: [0,100]
        rotation: [Math.PI*0.8, Math.PI*1.2]
        angularVelocity: [-Math.PI, Math.PI]
        alphaFrom: [0.5,1.0]
        alphaTo: [0, 0.0]
        scaleFrom: [1.0,1.6]
        scaleTo: [2.5, 5.5]
        playAnimation: false
        randomFrame: true
        relativeVelocity: false
        shapeType: 'Sprite'
        shapeArgs:
          offset: { x: 10, y: 10 }
          alpha: 0
          image: $('#smoke')[0]
          animation: 'main'
          animations:
            main: [
              { x: 0, y:0, width: 20, height: 20 },
              { x: 20, y: 0, width: 20, height: 20 },
              { x: 40, y: 0, width: 20, height: 20 },
              { x: 60, y: 0, width: 20, height: 20 }
            ]
        
    @add(emitter)
    emitter.start()

app.objects.SpaceShip = SpaceShip
