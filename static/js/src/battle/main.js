Rocketz.battle.main	= Kinetic.Layer.extend({
	init: function(cfg){
		this._super(cfg);
	},
	update: function(options){
		for (var i = 0; i < this.children.length; i++){
            var child   = this.children[i];

            if (!child.userData)    continue;
            
            var vx      = child.userData.vel[0] * 100;
            var vy      = child.userData.vel[1] * 100;
            var diff    = options.timeDiff;

            var x       = child.getX() + vx * diff * 0.001;
            var y       = child.getY() + vy * diff * 0.001;
            
            child.setX(x);
            child.setY(y);

        }
	},
	obj_created: function(data){
		var object	= new Kinetic.Rect({
			x: 0,
			y: 0,
			width: 50,
			height: 50,
			fill: 'black',
			name: data.id
		});
		
		object.move	= function(data){
			var pos	= data.pos;

			
			this.setX(pos[0] * 100);
			this.setY(pos[1] * 100);

            this.userData   = data;
		}

		this.add(object);
	}
})
