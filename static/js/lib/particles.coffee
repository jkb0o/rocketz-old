# -*- wrap: disabled -*-
Kinetic.Emitter = Kinetic.Group.extend {

    init: (config) ->
        @setDefaultAttrs {
            linearVelocity: [50, 100],
            linearAcceleration: [0, 0],
            angularVelocity: [0, 0],
            angularAcceleration: [0, 0],
            alphaFrom: [1,1],
            alphaTo: [1,1],
            scaleFrom: [1,1],
            scaleTo: [1,1],
            lifeTime: [1, 2],
            particleRotation: [0, 0]
            particlesPerSecond: 20,
            particleType: 'Ellipse',
            particleArgs: {},
            world: null
        }
        @nodeType = 'Group'
        @particles = []
        @unspawned = 0
        @_super(config)


    generate: (attr)->
        if @attrs[attr][0] == @attrs[attr][1]
            return @attrs[attr][0]
        else
            return @attrs[attr][0] + Math.random() * ( @attrs[attr][1] - @attrs[attr][0] )
        
        
    spawnParticles: ( timeDelta )->
        @unspawned += timeDelta
        spawnTime = 1/ @attrs.particlesPerSecond
        spawned = 0
        while @unspawned >= spawnTime
            spawned += 1
            @unspawned -= spawnTime
            @spawnParticle(timeDelta)
        

    removeParticles: ( timeDelta)->
        toRemove = []
        index = 0
        for particle in @particles
            if particle.life <= 0
                @attrs.world.remove(particle)
                toRemove.push(index)
            index += 1

        while toRemove.length
            @particles.splice(toRemove.pop(), 1)




    spawnParticle: ( timeDelta )->
        shape = new Kinetic[@attrs.particleType](@attrs.particleArgs)
        particle = new Kinetic.Particle {
            name: 'part',
            linearVelocity: @generate('linearVelocity'),
            angularVelocity: @generate('angularVelocity'),
            linearAcceleration: @generate('linearAcceleration'),
            angularAcceleration: @generate('angularAcceleration'),
            lifeTime: @generate('lifeTime'),
            alphaFrom: @generate('alphaFrom'),
            alphaTo: @generate('alphaTo'),
            scaleFrom: @generate('scaleFrom'),
            scaleTo: @generate('scaleTo'),
            relativeVelocity: @attrs.relativeVelocity,
        }
        @add(particle)
        pos = particle.getAbsolutePosition()
        @remove(particle)
        @attrs.world.add(particle)
        particle.setAbsolutePosition(pos)
        particle.add(shape)
        @particles.push(particle)
        
        rotation = @getRotation() + @generate('particleRotation')
        parent = @parent
        while parent
            rotation += parent.getRotation()
            parent = parent.parent
        particle.setRotation(rotation)

        if not @attrs.relativeVelocity
            particle.normalVelocity = {
                x: Math.cos(rotation) * particle.attrs.linearVelocity,
                y: Math.sin(rotation) * particle.attrs.linearVelocity
            }

        if @attrs.particleType == 'Sprite'
            if @attrs.playAnimation
                shape.start()

            if @attrs.randomFrame
                frames = shape.getAnimations()[shape.getAnimation()].length
                frame = parseInt(Math.random() * frames)
                shape.setIndex(frame)
    
    start: ()->
        if @started
            return
        @unspawned = 0
        @started = true

    stop: ()->
        @started = false

    setParticlesPerSecond: (num)->
        @attrs.particlesPerSecond = num
        @unspawned = 0

    getParticlesPerSecond: ()->
        @particlesPerSecond

    update: (timer)->
        delta = timer.timeDiff * 0.001
        @removeParticles(delta)
        if @started
            @spawnParticles(delta)
}


Kinetic.Particle = Kinetic.Group.extend {
    init: (config)->
        @_super(config)
        @resetDynamics()

    resetDynamics: ()->
        @life = @attrs.lifeTime
        @linearVelocity = @attrs.linearVelocity
        @angularVelocity = @attrs.angularVelocity


    update: (timer)->
        if @life <= 0
            return

        timeDelta = timer.timeDiff * 0.001
        rot = @getRotation()

        if @attrs.relativeVelocity
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

        @linearVelocity = Math.max(0, @linearVelocity - @attrs.linearAcceleration * timeDelta)
        @angularVelocity = @angularVelocity - @attrs.angularAcceleration * timeDelta
        
        timeFactor = 1 - (@attrs.lifeTime - @life) / @attrs.lifeTime
        
        if @attrs.alphaFrom == @attrs.alphaTo
            @getChildren()[0].setAlpha(@attrs.alphaTo)
        else
            alpha = @attrs.alphaTo + (@attrs.alphaFrom - @attrs.alphaTo) * timeFactor 
            alpha = Math.max(0, alpha)
            alpha = Math.min(1, alpha)
            @getChildren()[0].setAlpha(alpha)
        
        if @attrs.scaleFrom == @attrs.scaleTo
            @getChildren()[0].setScale(@attrs.scaleTo)
        else
            scale = @attrs.scaleTo + (@attrs.scaleFrom - @attrs.scaleTo) * timeFactor 
            @getChildren()[0].setScale(scale)

        @life -= timeDelta
}
