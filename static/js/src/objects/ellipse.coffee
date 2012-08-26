class Ellipse extends app.classes.objects.GameObject

  constructor: (options, data, center) ->
    super(options, data, center)
    options.radius = app.utils.radius(data.shape_options);
    allowedOptions = ['radius', 'fill']
    @add(new Kinetic.Ellipse(@parseConfig(options, allowedOptions)))


app.classes.objects.Ellipse = Ellipse