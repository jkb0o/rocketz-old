class Application extends Kinetic.Stage
  constructor: () ->
    @init({
      container: 'workspace',
      width: app.config.viewport.width,
      height: app.config.viewport.height
    })

    @input = {
      mask: 0
    }

    @config = app.config
    @layerClasses = app.classes.layers
    @objClasses = app.classes.objects
    @viewportsClasses = app.classes.viewports


    @layers =
      background : new @layerClasses.Background(@)
      battle     : new @layerClasses.Battle(@)

    @viewport = null

    @connection = new app.classes.sockets.RocketSocket(@)

    # TODO: rethink
    document.body.addEventListener('keydown', $.proxy(@processUserInput, @));
    document.body.addEventListener('keyup', $.proxy(@processUserInput, @));

    @onFrame($.proxy(@onFrameFunc, @))
    @start()


  onFrameFunc: (options)->
    if not @initialized
      return

#    pool = [@]
#    while (pool.length)
#      elem = pool.shift()
#      if elem.update?
#        elem.update(options)
#
#      if elem.nodeType in ['Stage', 'Layer', 'Group']
#        pool = pool.concat(elem.children)


    #    l.update(options) for l in @layers
    for layer in [@layers.battle, @layers.background]
      layer.update(options)

    @viewport.update(options)
    @draw()


  setWorldInfo: (content) ->
    lower = content.lower_bound;
    upper = content.upper_bound;
    width = upper[0] - lower[0];
    height = upper[1] - lower[1];
    width |= width;
    height |= height;
    width *= app.config.x_scale;
    height *= app.config.y_scale;
    @config.world.width = width;
    @config.world.height = height;
    @layers.world = new @layerClasses.World(@, @config.world.width, @config.world.height)
    # Viewport depends on all ather layers
    @viewport = new @viewportsClasses.BasicViewport(@)


  initDone: (content) ->
    @layers.background.drawLevel();
    @layers.world.draw();
    @layers.background.draw();
    @initialized = true;


  defaultDispatchHendler: (obj, type, content) ->
    return obj[type](content);


  dispatch: (type, content) ->
    console.log(type)

    switch type
      when "world_info" then @setWorldInfo(content)
      when "init_done" then @initDone(content)
      when "move" then @defaultDispatchHendler(@layers.battle.getByClass(content.obj), type, content)
      when "obj_created", "obj_removed", "identify" then @defaultDispatchHendler(@layers.battle, type, content)


  processUserInput: (e) ->
    code	= e.keyCode;
    codes	= [87,65,83,68];

    oldMask = @input.mask;
    newMask = @input.mask;

    allowedCodeIndex = codes.indexOf(code)

    if allowedCodeIndex >= 0
      if e.type == 'keydown'
        newMask = newMask | Math.pow(2, allowedCodeIndex)
      else
        newMask -= Math.pow(2, allowedCodeIndex)

    if newMask == oldMask
      return

    # TODO: dispatch something this code should be in emitter
    if (newMask & 1)
      @get('.smokeEmitter')[0].setParticlesPerSecond(60)
    else
      @get('.smokeEmitter')[0].setParticlesPerSecond(3)

    @input.mask = newMask;

    @connection.send({message: 'changeKeys', data: @input.mask});


$(() ->
  app.application = new Application();
);
