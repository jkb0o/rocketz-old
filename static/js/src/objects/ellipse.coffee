class Ellipse extends app.classes.objects.GameObject
  constructor: (options, data, center) ->
    super(options, data, center)
    options.radius = app.utils.radius(data.shape_options);
    @add(new Kinetic.Ellipse(options))


app.classes.objects.Ellipse = Ellipse