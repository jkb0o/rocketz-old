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

            var x       = child.worldx + vx * diff * 0.001;
            var y       = child.worldy - vy * diff * 0.001;
            var r       = child.getRotation() + vr * diff * 0.001;
            
            //child.setX(x);
            //child.setY(y);
            child.worldx = x;
            child.worldy = y;
            child.setRotation(r);

        }
	},
	obj_created: function(data){

        var points = utils.shape(data.shape),
            object	= new Kinetic.Polygon({
			x: Rocketz.config.viewport.width / 2,
			y: Rocketz.config.viewport.height / 2,
            points: points,
			fill: 'black',
			name: data.id,
            rotation: data.angle
		});

		object.move	= function(data){
			var pos	= utils.point(data.pos);

            console.log(pos);
            this.worldx = pos[0];
            this.worldy = stage.getHeight() - pos[1];
            this.setRotation(pos[2]);

            this.userData   = data;
		};
		this.add(object);
	},
    identify: function (data){
        data.self = true;
    }
});
