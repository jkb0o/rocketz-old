class Polygon extends app.objects.GameObject
  constructor: (options, data, center) ->
    super(options, data, center)
    options.points = app.utils.shape(data.shape_options);
    @add(new Kinetic.Polygon(options))

app.objects.Polygon = Polygon
