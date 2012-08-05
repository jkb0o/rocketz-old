;(function(app){
    var layerClass = Kinetic.Layer.extend({
        init: function(cfg){
            this._super(cfg);
            var back    = new Kinetic.Rect({
                width: app.config.world.width,
                height: app.config.world.height,
                fill: 'silver'
            });
            this.add(back);

            var grid = this.createGrid(back.getWidth(), back.getHeight());
            this.add(grid);
        },
        createGrid: function(w, h){
            var grid        = new Kinetic.Group();
            var count       = Math.ceil(w / 100) * Math.ceil(h / 100);

            for (var i = 0; i < count; i++){
                var r       = new Kinetic.Rect({
                    width: 100,
                    height: 100,
                    x: (i % (w / 100)) * 100,
                    y: Math.floor(i / (w / 100)) * 100,
                    stroke: 'red'
                });

                grid.add(r);
            }

            return grid;
        },
        update: function(options){
            return;
            var battle  = stage.get('.battle')[0];

            if (!battle)    return;

            var self    = null;

            for (var i = 0; i < battle.children.length; i++){
                if (battle.children[i].attrs.self){
                    self = battle.children[i];
                }
            }

            if (!self)      return;

            var sx      = self.x;
            var sy      = self.y;

            var x       = sx - 500;
            var y       = sy - 300;
        }
    });
    app.layers.background = new layerClass({name: 'background'});
})(Rocketz);

