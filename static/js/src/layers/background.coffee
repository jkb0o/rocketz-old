class Background extends Kinetic.Layer
  constructor: (@stage, zIndex = 0) ->
    @init({name: 'background'})
    @stage.add(@)
    @setZIndex(zIndex)

  drawLevel: () ->
    lvl = new Kinetic.Image({
      id: 'image',
      image: $('#back')[0]
    });
    @add(lvl);

  drawGrid: (width, height) ->
    grid = new Kinetic.Group();
    count = Math.ceil(w / 100) * Math.ceil(h / 100);
    back = new Kinetic.Rect({
      width: width,
      height: height,
      fill: 'silver'
    });
    @add(back);
    back.setZIndex(1);

    addGridRect = (index, width, height) ->
      rectOptions =
        width: 100
        height: 100
        x: (index % (width / 100)) * 100
        y: Math.floor(index / (width /  100)) * 100
        stroke: 'red'
        zIndex: 0

      grid.add(new Kinetic.Rect(rectOptions))

    addGridRect(i) for i in [0..count]

    @add(grid)
    grid.setZIndex(2)

  update: (options) ->
    return

app.classes.layers.Background = Background