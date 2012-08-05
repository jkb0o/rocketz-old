;(function(app){
    var layerClass = Kinetic.Layer.extend({
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

                var vx = child.userData.vel[0] * 50;
                var vy = child.userData.vel[1] * 50;
                var vr = child.userData.avel;
                var diff = options.timeDiff;

                var x = child.getX() + vx * diff * 0.001;
                var y = child.getY() - vy * diff * 0.001;
                var r = child.getRotation() + vr * diff * 0.001;

                child.setX(x);
                child.setY(y);
                child.setRotation(r);
            }
        },
        obj_created:function (data) {
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
                console.log("Create poly")
                options.points = utils.shape(data.shape);
                object = new Kinetic.Polygon(options);
            } else {
                console.log("Create circle")
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
            };

            this.add(object);
        }
    });
    app.layers.battle = new layerClass({name: 'battle'});
})(Rocketz);
