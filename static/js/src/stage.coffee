class Stage extends Kinetic.Stage
  constructor: () ->
    @init({
      container: 'workspace',
      width: app.config.viewport.width,
      height: app.config.viewport.height
    })

app.classes.stage = Stage