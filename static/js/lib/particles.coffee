# -*- wrap: disabled -*-
class Kinetic.ParticlePool
  constructor: ( @name, @numParticles, @numConfigs, @config ) ->
    @particles = []
    @particlesUsed = 0
    @configs = []

    @config.linearVelocity ||= [50, 100]
    @config.linearAcceleration || = [0, 0]
    @config.angularVelocity ||= [0, 0]
    @config.angularAcceleration ||= [0, 0]
    @config.alphaFrom ||= [1, 1]
    @config.alphaTo || [1, 1]
    @config.scaleFrom ||= [1, 1]
    @config.scaleTo ||= [1, 1]
    @config.lifeTime ||= [1, 2]
    @config.rotation ||= [0, 0]

    @config.value = (attr)->
      if @[attr][0] == @[attr][1]
        return @[attr][0]
      else
        return @[attr][0] + Math.random() * ( @[attr][1] - @[attr][0] )

  size: ()->
    @particlesUsed + @particles.length

  get: ()->
    if @size() < @numParticles
      particle = @createParticle()
    else if @particles.length
      particle = @particles.shift()
    else
      throw new Error('No free particles in pool ' + @name)
    
    @particlesUsed += 1
    config = @getConfig()
    particle.setConfig(config)
    return particle

  release: (particle)->
    @particlesUsed -= 1
    @particles.push particle

  getConfig: ()->
    if @configs.length == @numConfigs
      config = @configs.shift()
      @configs.push config
      return config
      
    conf = {}
    conf[attr] = @config.value(attr) for attr in [
      'linearVelocity',
      'linearAcceleration',
      'angularVelocity',
      'angularAcceleration',
      'alphaFrom',
      'alphaTo',
      'scaleFrom',
      'scaleTo',
      'lifeTime',
      'rotation'
    ]

    @configs.push conf
    return conf

  createParticle: ()->
    shape = new Kinetic[@config.shapeType](@config.shapeArgs)
    particle = new Kinetic.Particle(shape, @)
    return particle


class Kinetic.ParticleEmitter extends Kinetic.Group

  @fromConfig: (config)->
    particleConfig = config.particleConfig || {}
    delete config.particleConfig

    if config.poolSize
      poolSize = config.poolSize
    else
      if particleConfig.lifeTime
        particleLifeTime = particleConfig.lifeTime[1]
      else
        particleLifeTime = 2
      particlesPerSecond = config.particlesPerSecond || 50
      poolSize = particlesPerSecond * particleLifeTime
      poolSize *= 1.1
      poolSize = Math.round poolSize

    numConfigs = config.numConfigs || 100
    name = config.name || 'unnamedEmitter'
    config.pool = new Kinetic.ParticlePool name, poolSize, numConfigs, particleConfig

    return new Kinetic.ParticleEmitter(config)

  init: (config) ->
    @nodeType = 'Group'
    @particles = []
    @unspawned = 0
    @world = config.world
    @pool = config.pool
    @particlesPerSecond = config.particlesPerSecond || 50

    super(config)

  spawnParticles: ( timeDelta )->
    @unspawned += timeDelta
    spawnTime = 1/ @particlesPerSecond
    spawned = 0
    while @unspawned >= spawnTime
      spawned += 1
      @unspawned -= spawnTime

      particle = @pool.get()
      particle.addRelativeTo(@)
      @particles.push particle
    

  removeParticles: ( timeDelta)->
    toRemove = []
    index = 0
    for particle in @particles
      if particle.life <= 0
        @world.remove(particle)
        toRemove.push(index)
        particle.release()
      index += 1

    while toRemove.length
      @particles.splice(toRemove.pop(), 1)

  start: ()->
    if @started
      return
    @unspawned = 0
    @started = true

  stop: ()->
    @started = false

  setParticlesPerSecond: (num)->
    @particlesPerSecond = num
    @unspawned = 0

  getParticlesPerSecond: ()->
    @particlesPerSecond

  update: (timer)->
    delta = timer.timeDiff * 0.001
    @removeParticles(delta)
    if @started
      @spawnParticles(delta)


class Kinetic.Particle extends Kinetic.Group
  init: (shape, pool)->
    super({})
    @shape = shape
    @pool = pool
    @config = null

  setConfig: (config)->
    @config = config
    @life = config.lifeTime
    @linearVelocity = config.linearVelocity
    @angularVelocity = config.angularVelocity
    @setX(0)
    @setY(0)

  addRelativeTo: (emitter)->
    # add to world, relative to emitter
    emitter.add(@)
    pos = @getAbsolutePosition()
    emitter.remove(@)
    emitter.world.add(@)
    @setAbsolutePosition(pos)
    @add(@shape)
    
    # caclulate world rotation
    rotation = emitter.getRotation() + @config.rotation
    parent = emitter.parent
    while parent
      rotation += parent.getRotation()
      parent = parent.parent
    @setRotation(rotation)

    # caclculate velocity if it direction is static on particle lifetime
    if !@config.relativeVelocity
      @normalVelocity =
        x: Math.cos(rotation) * @config.linearVelocity
        y: Math.sin(rotation) * @config.linearVelocity
   
    # start particle aminamation if needded
    if @config.shapeType == 'Sprite'
      if @config.playAnimation
        @shape.start()

      if @config.randomFrame
        frames = @shape.getAnimations()[@shape.getAnimation()].length
        frame = Math.random() * frames << 0
        @shape.setIndex frame

  release: ()->
    @pool.release(@)

  update: (timer)->
    if @life <= 0
      return

    timeDelta = timer.timeDiff * 0.001
    rot = @getRotation()

    if @config.relativeVelocity
      vx = Math.cos(rot) * @linearVelocity
      vy = Math.sin(rot) * @linearVelocity
    else
      vx = @normalVelocity.x
      vy = @normalVelocity.y

    pos = @getPosition()
    pos.x += vx * timeDelta
    pos.y += vy * timeDelta
    @setPosition(pos)
    @setRotation(@getRotation() + @angularVelocity * timeDelta)

    @linearVelocity = Math.max(0, @linearVelocity - @config.linearAcceleration * timeDelta)
    @angularVelocity = @angularVelocity - @config.angularAcceleration * timeDelta
    
    timeFactor = 1 - (@config.lifeTime - @life) / @config.lifeTime
    
    if @config.alphaFrom == @config.alphaTo
      @getChildren()[0].setAlpha(@config.alphaTo)
    else
      alpha = @config.alphaTo + (@config.alphaFrom - @config.alphaTo) * timeFactor
      alpha = Math.max(0, alpha)
      alpha = Math.min(1, alpha)
      @getChildren()[0].setAlpha(alpha)

    if @config.scaleFrom == @config.scaleTo
      @getChildren()[0].setScale(@config.scaleTo)
    else
      scale = @config.scaleTo + (@config.scaleFrom - @config.scaleTo) * timeFactor
      @getChildren()[0].setScale(scale)

    @life -= timeDelta
