(function(app){

    var Timer = function(){
        return {
            lastTimeStamp: null,
            getDiff: function() {
                if (!this.lastTimeStamp) {
                    this.lastTimeStamp = new Date().getTime();
                    return 0;
                }
                var newTimeStamp = new Date().getTime();
                var diff = newTimeStamp - this.lastTimeStamp;
                this.lastTimeStamp = newTimeStamp;
                return diff / 1000;
            }
        };
    };

    app.utils = {
        worldPoint: function(data){
            // TODO: remove it to reduce load. New var is for debugging purpose;
            // data[0] *= Rocketz.config.viewport.x_scale;
            // data[1] *= Rocketz.config.viewport.y_scale;
            // return data

            var newPoint = app.utils.localPoint(data);
            newPoint[1] = app.config.world.height + newPoint[1];
            return newPoint;
        },
        localPoint: function(data){
            var newPoint = [];
            newPoint[0] = data[0] * app.config.x_scale;
            newPoint[1] = -data[1] * app.config.y_scale;
            return newPoint;
        },
        radius: function(data){
            if (data.length){
                var newRadius = [];
                newRadius[0] = data[0] * app.config.x_scale;
                newRadius[1] = data[1] * app.config.y_scale;
                return newRadius;
            } else {
                return data * app.config.x_scale;
            }
        },
        velocity: function(data){
            var newVelocity = [];
            newVelocity[0] = data[0] * app.config.x_scale;
            newVelocity[1] = data[1] * app.config.y_scale;
            return newVelocity;
        },
        shape: function(data){
            var shape = [];

            for (var i=0, l=data.length; i<l; i++){
                var point = app.utils.localPoint(data[i]);
                shape = shape.concat(point);
            }
            return shape;
        },
        distance: function(p1, p2){
            var x_d = p1[0] - p2[0];
            var y_d = p1[1] - p2[1];
            return x_d*x_d + y_d*y_d;
        },
        timers: {},
        getTimer: function(name){
            var timer = this.timers[name];
            if (timer){
                return this.timers[name]
            }
            timer = Timer();
            this.timers[name] = timer;
            return timer
        }
    };
})(Rocketz);
