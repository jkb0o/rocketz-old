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

                var x = child.worldx + vx * diff;
                var y = child.worldy - vy * diff;
                var r = child.getRotation() + vr * diff;

                child.worldx = x;
                child.worldy = y;

                //x -= x % config.pixelSize;
                //y -= y % config.pixelSize;

                child.setX(x);
                child.setY(y);
                child.setRotation(r);
            }
        },
        addObject: function (data, options, center) {
            if (data.static && ! app.config.drawStatic){
                return;
            }
            var object = null;
            if (data.type == 'Spaceship'){
                object = new Kinetic.Group(options);
                var ship = new Kinetic.Image({
                    image: $('#spaceship')[0],
                    offset: { x: 42, y: 42 },
                    fill  : "rgba(255, 255, 255, 0.0)"
                });
                var emitter = new Kinetic.Emitter({
                    name: 'smokeEmitter',
                    particleType: 'Sprite',
                    world: app.layers.battle,
                    x: -40, y: 0,
                    lifeTime: [0.5, 2.5],
                    linearVelocity: [0,100],
                    particlesPerSecond: 3,
                    particleRotation: [Math.PI*0.8, Math.PI*1.2],
                    angularVelocity: [-Math.PI, Math.PI],
                    alphaFrom: [0.5,1.0],
                    alphaTo: [0, 0.0],
                    scaleFrom: [1.0,1.6],
                    scaleTo: [2.5, 5.5],
                    playAnimation: false,
                    randomFrame: true,
                    relativeVelocity: false,
                    particleArgs: {
                        offset: { x: 10, y: 10 },
                        alpha: 0,
                        image: $('#smoke')[0],
                        animation: 'main',
                        animations: {
                            main: [
                                { x: 0, y:0, width: 20, height: 20 },
                                { x: 20, y: 0, width: 20, height: 20 },
                                { x: 40, y: 0, width: 20, height: 20 },
                                { x: 60, y: 0, width: 20, height: 20 }
                            ]
                        }
                    }
                });
                object.add(emitter);
                object.add(ship);
                object.smokeEmmiter = emitter;
                emitter.start();
            }
            else if (data.shape_type == 'poly') {
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
            object.move = function (data) {
                console.log(this)
                var pos = utils.worldPoint(data.pos);
                this.worldx = pos[0];
                this.worldy = pos[1];
                //this.setX(pos[0]);
                //this.setY(pos[1]);
                this.setRotation(data.rot);
                this.userData = data;
            };
            this.add(object);
            return object;
        },
        obj_created:function (data) {
            var center = utils.worldPoint(data.center),
                options = {
                    fill:'black',
                    name: data.id,
                    rotation:data.angle,
                    x:center[0],
                    y:center[1],
                    zIndex: 10,
                };
            this.addObject(data, options, center);
        },
        obj_removed:function (data){
            var object = this.get('.'+data.obj)[0];
            this.remove(object);
        },
        identify: function (data) {
            var object = this.get('.'+data.obj)[0],
                old_data = object.oldAttributes.data,
                options = object.oldAttributes.options;

            options.fill = config.playerShipColor;

            this.remove(object);

            var center = [
                config.viewport.width / 2,
                config.viewport.height / 2
            ];

            object = this.addObject(old_data, options, center);
            object.self = true;
            console.log('set target', object)
            app.viewport.target = object;
        }
    });
    app.layers.battle = new layerClass({name: 'battle'});
})(Rocketz);
