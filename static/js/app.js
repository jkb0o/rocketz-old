$(function(){
    
    mask    = 0;

	stage	= new Kinetic.Stage({
		container	: 'workspace',
		width		: Rocketz.config.viewport.width,
		height		: Rocketz.config.viewport.height
	});

	back	= new Rocketz.background.main({name: 'background'});
	battle	= new Rocketz.battle.main({name: 'battle'});

	stage.add(back);
	stage.add(battle);

	stage.onFrame(function(options){
	    battle.update(options);
        Rocketz.viewport.update();
        stage.draw();
	});	

	stage.start();

    utils = {
        point: function(data){
            // TODO: remove it to reduce load. New var is for debugging purpose;
            // data[0] *= Rocketz.config.viewport.x_scale;
            // data[1] *= Rocketz.config.viewport.y_scale;
            // return data

            var new_point = [];
            new_point[0] = data[0] * Rocketz.config.viewport.x_scale;
            new_point[1] = Rocketz.config.world.height - data[1] * Rocketz.config.viewport.y_scale;
            return new_point;
        },
        shape: function(data){
            var shape = [];
            for (var i=0, l=data.length; i<l; i++){
                var point = utils.point(data[i]);
                shape = shape.concat(point);
            }
            return shape;
        }
    };

    var processInput = function(e){
        var code	= e.keyCode;
        var codes	= [87,65,83,68];

        var oldMask = mask;

        for (var i = 0; i < codes.length; i++){
            var item = codes[i];

            if (code != item)
                continue;

            mask = mask | Math.pow(2, i);
        }

        if (mask == oldMask){
            return;
        }

        connection.send(JSON.stringify({message: 'changeKeys', data: mask}));
    };

	document.body.addEventListener('keydown', processInput);
	document.body.addEventListener('keyup', processInput);

    initSocket();

});
