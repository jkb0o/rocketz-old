class World extends Kinetic.Layer
  constructor: () ->
    @init({name: 'world'})

  initChildren: () ->
    img = new Kinetic.Image({
      image: $('#world')[0]
    })
    @add(img)

app.layers.world = new World()
