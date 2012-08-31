class ns.classes.viewports.BasicViewport
    constructor: (@app)->
      @frontLayers = [@app.layers.world, @app.layers.battle]
      @backLayer = @app.layers.background

      @size = new Vec2(
        @app.config.viewport.width,
        @app.config.viewport.height
      )
      @pos = new Vec2(0, 0)
      @target = null
      @back = null        # background size
      @world = null       # world size
      @factor = ns.config.viewport.easingStretch


    update: (options)->
        if !@target
            return
        
        if @backLayer && !@back
            img = @backLayer.get('#image')[0]
            @back = new Vec2(img.getWidth(), img.getHeight())

        if !@world
            @world = new Vec2(
                @app.config.world.width,
                @app.config.world.height
            )

        targetPos = new Vec2(@target.getX(), @target.getY())

        center = @size.mult(-0.5).addThis(targetPos)
        center.limitThis(Vec2.Zero, @world.sub(@size))

        timeDiff = options.timeDiff * 0.001
        velocity = center.sub(@pos).multThis(@factor)
        newPos = @pos.add(velocity.multThis(timeDiff))

        if newPos.valid()
            @pos = newPos

        for layer in @frontLayers
            layer.setOffset(@pos.xy())

        if !@backLayer
            return

        backOffset = @pos.div(@world.sub(@size)) #factpr
        backOffset = @size.sub(@back).multThis(backOffset).multThis(-1)
        @backLayer.setOffset(backOffset.xy())
        


