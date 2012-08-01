Rocketz.battle.main	= Kinetic.Layer.extend({
	init: function(cfg){
		this._super(cfg);
	},
	update: function(options){
		for (var i = 0; i < this.children.length; i++){
            var child   = this.children[i];

            if (!child.userData)    continue;
            
            var vx      = child.userData.vel[0] * 50;
            var vy      = child.userData.vel[1] * 50;
            var vr      = child.userData.vel[2];
            var diff    = options.timeDiff;

            var x       = child.getX() + vx * diff * 0.001;
            var y       = child.getY() - vy * diff * 0.001;
            var r       = child.getRotation() + vr * diff * 0.001;

            child.setX(x);
            child.setY(y);
            child.setRotation(r);
        }
	},
	obj_created: function(data){
		var object	= new Kinetic.Polygon({
			x: 0,
			y: 0,
            points: [ 
                -25,25,
                40, 0,
                -25, -25
            ],
			fill: 'black',
			name: data.id
		});
        //object.setOffset(25, 25)
		
		object.move	= function(data){
			var pos	= data.pos;

			
			this.setX(pos[0] * 50);
			this.setY(stage.getHeight() - pos[1] * 50);
            this.setRotation(pos[2]);

            this.userData   = data;
		}

		this.add(object);
	}
})
