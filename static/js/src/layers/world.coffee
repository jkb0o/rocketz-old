class World extends Kinetic.Layer
  constructor: (@stage, width, height, zIndex = 1) ->
    @init({name: 'world'})
    @stage.add(@)
    @setZIndex(zIndex)
    img = new Kinetic.Image({
      image: $('#world')[0]
    })
    @add(img)

ns.classes.layers.World = World