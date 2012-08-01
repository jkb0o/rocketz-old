Rocketz.background.main	= Kinetic.Layer.extend({
	init: function(cfg){
		this._super(cfg);

        var back    = new Kinetic.Rect({
            width: 1000,
            height: 600,
            fill: 'silver'
        });
        this.add(back);
        
        var grid    = this.createGrid(back.getWidth(), back.getHeight());
        this.add(grid);
	},
    createGrid: function(w, h){

        var grid        = new Kinetic.Group();
        var count       = Math.ceil(w / 250) * Math.ceil(h / 250);
        
        for (var i = 0; i < count; i++){
            var r       = new Kinetic.Rect({
                width: 250,
                height: 250,
                x: (i % 4) * 250,
                y: Math.floor(i / 4) * 250,
                stroke: 'red'
            });

            grid.add(r);
        }

        return grid;
    },
    update: function(options){
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

        this.setX(x);
        this.setY(y);

        console.log(x, y)
        
    }
})
