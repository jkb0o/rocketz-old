class Polygon extends ns.classes.objects.GameObject
  constructor: (options, data, center) ->
    super(options, data, center)
    options.points = ns.utils.shape(data.shape_options);
    @add(new Kinetic.Polygon(options))

ns.classes.objects.Polygon = Polygon
