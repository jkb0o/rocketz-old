// initialize application
$(function(){
    var app = Rocketz;
    app.input.mask    = 0;

    if ($.isFunction(Rocketz.stage)){
        app.stage = app.stage();
    }

    for (var layerName in app.layers){
        var layer = app.layers[layerName];
        if (!layer){
            continue;
        }
        app.stage.add(layer);
    }

	app.stage.onFrame(function(options){
        for (var layerName in app.layers){
            var layer = app.layers[layerName];
            if (!layer){
                continue;
            }
            layer.update(options)
        }
        app.stage.draw();
	});

    app.stage.start();



    var processInput = function(e){
        var code	= e.keyCode;
        var codes	= [87,65,83,68];

        var oldMask = app.input.mask,
            newMask = app.input.mask;

        for (var i = 0; i < codes.length; i++){
            var allowed_code = codes[i];
            if (code == allowed_code){
                if (e.type == 'keydown'){
                    newMask = newMask | Math.pow(2, i);
                } else {
                    newMask -= Math.pow(2, i);
                }
                break;
            }
        }

        if (newMask == oldMask){
            return;
        }
        app.input.mask = newMask;
        app.connection.send(JSON.stringify({message: 'changeKeys', data: app.input.mask}));
    };

	document.body.addEventListener('keydown', processInput);
	document.body.addEventListener('keyup', processInput);
});
