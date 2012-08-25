class Battle extends Kinetic.Layer
  constructor: (@stage, zIndex = 2) ->
    @init({name: 'battle'})
    @stage.add(@)
    @setZIndex(zIndex)
    @config = @stage.config
    @objClasses = app.classes.objects

  getByClass: (className) ->
    return @get('.'+className)[0]

  update: (options) ->
    console.log(@children)
    for object in @children #when object.userData and !object.isStatic
      @drawObject(object, options)

  drawObject: (object, options) ->
    vel = app.utils.velocity(object.userData.vel);

    vx = vel[0];
    vy = vel[1];
    vr = object.userData.avel;
    diff = options.timeDiff * 0.001;

    x = object.worldx + vx * diff;
    y = object.worldy - vy * diff;
    r = object.getRotation() + vr * diff;

    object.worldx = x;
    object.worldy = y;

    object.setX(x);
    object.setY(y);
    object.setRotation(r);

  doNothing: ()->

  addObject: (data, options, center) ->
    object = null

    if data.static and !app.config.drawStatic
      return

    switch data.type
      when 'Spaceship' then object = new @objClasses.SpaceShip(options, data, center)
      when 'Poly' then object = new @objClasses.Polygon(options, data, center)
      when 'Bullet' then object = new @objClasses.Ellipse(options, data, center)
      else
        object = null

    if not object
      return

    @add(object.getLayerObject())
    return object


  obj_created: (data) ->
    console.log('created')
    center = app.utils.worldPoint(data.center)
    options = {
        fill:'black',
        name: data.id,
        rotation:data.angle,
        x:center[0],
        y:center[1],
        zIndex: 10,
    };
    @addObject(data, options, center)


  obj_removed: (data) ->
    console.log('removed')
    id = '.'+data.obj
    objects = @get(id)
    @remove(objects[0])


  identify: (data) ->
    id = '.'+data.obj
    objects = this.get('.'+data.obj)
    object = objects[0]

    old_data = object.oldAttributes.data
    options = object.oldAttributes.options

    options.fill = @config.playerShipColor
    @remove(object);
    center = [
      @config.viewport.width / 2,
      @config.viewport.height / 2
    ];
    object = this.addObject(old_data, options, center);
    object.self = true;
    @stage.viewport.target = object;

app.classes.layers.Battle = Battle