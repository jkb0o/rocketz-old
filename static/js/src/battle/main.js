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

            //child.setX(x);
            //child.setY(y);
            //child.x     = x;
            //child.y     = y;
            child.setRotation(r);
        }
	},
	obj_created: function(data){
<<<<<<< HEAD
		var object	= new Kinetic.Rect({
			x: 500,
			y: 300,
			width: 50,
			height: 50,
=======
		var object	= new Kinetic.Polygon({
			x: 0,
			y: 0,
            points: [ 
                -25,25,
                40, 0,
                -25, -25
            ],
>>>>>>> 8a0435956109a21d8e1c6ba9d5af07313c0cf735
			fill: 'black',
			name: data.id,
            self: true
		});
        //object.setOffset(25, 25)
		
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
