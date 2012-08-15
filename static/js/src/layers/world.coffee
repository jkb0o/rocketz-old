layerClass = Kinetic.Layer.extend {
    initChildren: () ->
        img = new Kinetic.Image({
            image: $('#world')[0]
        })
        @add(img)
}
app.layers.world = new layerClass({name: 'wold'})
