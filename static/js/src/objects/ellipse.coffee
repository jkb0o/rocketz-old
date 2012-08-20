class Ellipse extends app.objects.GameObject
  constructor: (options, data, center) ->
    super(options, data, center)
    options.radius = app.utils.radius(data.shape_options);
    @add(new Kinetic.Ellipse(options))

app.objects.Ellipse = Ellipse