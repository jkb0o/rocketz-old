;(function(app){
    var layerClass = Kinetic.Layer.extend({
        viewPortTarget: null,
        init:function (cfg) {
            this._super(cfg);
        },
        update:function (options) {
            var utils = app.utils;

            for (var i = 0; i < this.children.length; i++) {

                var child = this.children[i];

                if (!child.userData | child.isStatic){
                    continue;
                }

                var vel = utils.velocity(child.userData.vel);
                var vx = vel[0];
                var vy = vel[1];
                var vr = child.userData.avel;
                var diff = options.timeDiff * 0.001;

                var x = child.getX() + vx * diff;
                var y = child.getY() - vy * diff;
                var r = child.getRotation() + vr * diff;

                child.setX(x);
                child.setY(y);
                child.setRotation(r);
            }
        },
        obj_created:function (data) {
            var layer = this;
            var utils = app.utils;
            var center = utils.worldPoint(data.center);
            var points = null,
                radius = 0.0,
                shapeClass = null,
                object = null,
                options = {
                    fill:'black',
                    name:data.id,
                    rotation:data.angle,
                    x:center[0],
                    y:center[1]
                };

            if (data.shape_type == 'poly'){
                console.log("Create poly");
                options.points = utils.shape(data.shape);
                object = new Kinetic.Polygon(options);
            } else {
                console.log("Create circle");
                options.radius = utils.radius(data.radius);
                object = new Kinetic.Ellipse(options);
            }

            object.isStatic = data.static;
            object.userData = {
                pos: data.center.concat(data.angle),
                vel: [0, 0, 0],
                obj: data.id
            };

            object.worldx = center[0];
            object.worldy = center[1];

            object.move = function (data) {
                var pos = utils.worldPoint(data.pos);
                this.setX(pos[0]);
                this.setY(pos[1]);
                this.setRotation(data.rot);
                this.userData = data;
            };
            object.identify = function (data) {
                data.self = true;
                data.x = app.config.viewport.width / 2;
                data.y = app.config.viewport.height / 2;
                layer.viewPortTarget = this;
            };

            this.add(object);
        }
    });
    app.layers.battle = new layerClass({name: 'battle'});
})(Rocketz);
