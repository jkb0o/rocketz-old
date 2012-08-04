(function(app){
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
            newPoint[0] = data[0] * app.config.viewport.x_scale;
            newPoint[1] = -data[1] * app.config.viewport.y_scale;
            return newPoint;
        },
        velocity: function(data){
            var newVelocity = [];
            newVelocity[0] = data[0] * app.config.viewport.x_scale;
            newVelocity[1] = data[1] * app.config.viewport.y_scale;
            return newVelocity;
        },
        shape: function(data){
            var shape = [];

            for (var i=0, l=data.length; i<l; i++){
                var point = app.utils.localPoint(data[i]);
                shape = shape.concat(point);
            }
            return shape;
        }
    };
})(Rocketz);