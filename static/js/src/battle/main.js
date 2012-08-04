Rocketz.battle.main	= Kinetic.Layer.extend({
	done_count: 0,
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
//
            var diff    = options.timeDiff;
//
            var x       = child.worldx + vx * diff * 0.001;
            var y       = child.worldy - vy * diff * 0.001;
//
            var r       = child.getRotation() + vr * diff * 0.001;

//            console.log('HERRREE!!!');
            child.setX(x);
            child.setY(y);
            child.setRotation(r);

        }
	},
	obj_created: function(data){
        if (this.done_count > 0){
            return
        }
        this.done_count++;

        var points = utils.shape(data.shape),
            center = utils.point(data.center);

        var object = new Kinetic.Polygon({
            points: points,
			fill: 'black',
			name: data.id,
            rotation: data.angle,
            x: center[0],
            y: center[1]
		});

        console.log('center');

        object.userData = {
            pos: data.center.concat(data.angle),
            vel: [0,0,0],
            obj: data.id
        };

        object.worldx = center[0];
        object.worldy = center[1];

        console.log(center);

		object.move	= function(data){
//			var pos	= utils.point(data.pos);
//            this.worldx = pos[0];
//            this.worldy = pos[1];
//            this.setRotation(pos[2]);
//            this.userData   = data;
		};
        object.identify = function(data){
            data.self = true;
            data.x = Rocketz.config.viewport.width / 2;
            data.y = Rocketz.config.viewport.height / 2;
        };

		this.add(object);
	}
});
