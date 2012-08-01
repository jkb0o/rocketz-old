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

            var x       = child.x + vx * diff * 0.001;
            var y       = child.y - vy * diff * 0.001;
            var r       = child.getRotation() + vr * diff * 0.001;
            
            //child.setX(x);
            //child.setY(y);
            child.x = x;
            child.y = y;
            child.setRotation(r);
        }
	},
	obj_created: function(data){
		var object	= new Kinetic.Polygon({
			x: 500,
			y: 300,
            points: [ 
                -25,25,
                40, 0,
                -25, -25
            ],
			fill: 'black',
			name: data.id,
            self: true
		});
		
		object.move	= function(data){
            
			var pos	= data.pos;
			
			//this.setX(pos[0] * 50);
			//this.setY(stage.getHeight() - pos[1] * 50);
            this.x = pos[0] * 50;
            this.y = stage.getHeight() - pos[1] * 50;
            this.setRotation(pos[2]);

            this.userData   = data;
		}

		this.add(object);
	}
})
