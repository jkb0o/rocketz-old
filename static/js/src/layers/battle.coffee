class Battle extends Kinetic.Layer
  constructor: () ->
    @init({name: 'battle'})
    @config = app.config

  update: (options) ->
    @drawObject(object, options) for object in @children when object.userData and !object.isStatic

  drawObject: (object, options) ->
    vel = app.utils.velocity(object.userData.vel);

#    console.log('draw', object.worldx, object.worldy)

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
      when 'Spaceship' then object = new app.objects.SpaceShip(options, data, center)
      when 'Poly' then object = new app.objects.Polygon(options, data, center)
      else object = new app.objects.Ellipse(options, data, center)

    @add(object.getLayerObject())
    return object


  obj_created: (data) ->
    center = app.utils.worldPoint(data.center)
    options = {
        fill:'black',
        name: data.id,
        rotation:data.angle,
        x:center[0],
        y:center[1],
        zIndex: 10,
    };
    return @addObject(data, options, center);


  obj_removed: (data) ->
    id = '.'+data.obj
    objects = @get(id)
    @remove(objects[0])


  identify: (data) ->
    console.log('identify')
    id = '.'+data.obj
    objects = this.get('.'+data.obj)
    object = objects[0]

    old_data = object.oldAttributes.data
    options = object.oldAttributes.options

    options.fill = app.config.playerShipColor
    @remove(object);
    center = [
      app.config.viewport.width / 2,
      app.config.viewport.height / 2
    ];
    object = this.addObject(old_data, options, center).object;
    object.self = true;
    app.viewport.target = object;

app.layers.battle = new Battle()
