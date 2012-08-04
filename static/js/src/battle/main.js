Rocketz.battle.main	= Kinetic.Layer.extend({
    init: function(cfg){
		this._super(cfg);
	},
	update: function(options){
        return;
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

            child.setX(x);
            child.setY(y);
            child.setRotation(r);

        }
	},
	obj_created: function(data){

        var center = utils.worldPoint(data.center),
            points = utils.shape(data.shape);

        var object = new Kinetic.Polygon({
            points: points,
			fill: 'black',
			name: data.id,
            rotation: data.angle,
            x: center[0],
            y: center[1]
		});


        object.userData = {
            pos: data.center.concat(data.angle),
            vel: [0,0,0],
            obj: data.id
        };

        object.worldx = center[0];
        object.worldy = center[1];

        console.log(center);

		object.move	= function(data){
			var pos	= utils.worldPoint(data.pos);
            this.setX(pos[0]);
            this.setY(pos[1]);
            console.log
            this.setRotation(pos[2]);
            this.userData   = data;
		};
        object.identify = function(data){
            data.self = true;
            data.x = Rocketz.config.viewport.width / 2;
            data.y = Rocketz.config.viewport.height / 2;
        };

		this.add(object);
	}
});
