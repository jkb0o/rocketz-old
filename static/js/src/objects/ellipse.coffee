class Ellipse extends ns.classes.objects.GameObject

  constructor: (options, data, center) ->
    super(options, data, center)
    options.radius = ns.utils.radius(data.shape_options);
    allowedOptions = ['radius', 'fill']
    @add(new Kinetic.Ellipse(@parseConfig(options, allowedOptions)))


ns.classes.objects.Ellipse = Ellipse