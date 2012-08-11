;(function(app){
    var utils = app.utils,
        config = app.config;

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
        addObject: function (data, options, center) {
            var object = null;

            if (data.shape_type == 'poly') {
                options.points = utils.shape(data.shape_options);
                object = new Kinetic.Polygon(options);
            } else {
                options.radius = utils.radius(data.shape_options);
                object = new Kinetic.Ellipse(options);
            }
            object.oldAttributes = {
                data: data,
                options: options,
                center: center
            };
            object.data = data;

            object.isStatic = data.static;
            object.userData = {
                pos:data.center.concat(data.angle),
                vel:[0, 0, 0],
                obj:data.id
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
            data.static  ? app.layers.background.add(object) : this.add(object);
            return object;
        },
        obj_created:function (data) {
            var center = utils.worldPoint(data.center),
                options = {
                    fill:'black',
                    name: data.id,
                    rotation:data.angle,
                    x:center[0],
                    y:center[1]
                };
            this.addObject(data, options, center);
        },
        obj_removed:function (data){
            var object = this.get('.'+data.obj)[0];
            this.remove(object);
        },
        identify: function (data) {
            console.log('identify', data);
            var object = this.get('.'+data.obj)[0],
                old_data = object.oldAttributes.data,
                options = object.oldAttributes.options;

            console.log(1);
            options.fill = config.playerShipColor;

            this.remove(object);
            console.log(2);

            var center = [
                config.viewport.width / 2,
                config.viewport.height / 2
            ];
            console.log(3);

            object = this.addObject(old_data, options, center);
            console.log(4);
            object.self = true;
            console.log(5);
            this.viewPortTarget = object;
            console.log(6);
        }
    });
    app.layers.battle = new layerClass({name: 'battle'});
})(Rocketz);
