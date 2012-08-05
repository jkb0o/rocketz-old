// initialize application
$(function(){
    var app = Rocketz;
    app.input.mask    = 0;

    // TODO: The workflow will change layers will be initialized after world_info message!

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
        app.viewport.update(options);
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

    app.process_server_signals = function (data){
        /*
         * data = {
         *     'type': 'Notification' // or 'Request' or 'Response'
         *     'body': message_body
         * }
         *
         * notification_body = {
         *     'content_type': 'obj_created', // or other server notification
         *     'content': notification_content
         * }
         */

        var target	= null;

        var battle = app.layers['battle'];

        if (data.body.content_type == "world_info") {
            // TODO: implement when Yash will finish backend
        }
        if (data.body.content_type == "obj_created") {
            target = battle;
        }
        if (data.body.content_type == "obj_removed") {
            target = battle;
        }
        if (data.body.content_type == "move") {
            target = battle.get('.'+data.body.content.obj)[0]
        }
        if (data.body.content_type == "identify") {
            target = battle;
        }
        if (!target){
            return;
        }
        target[data.body.content_type](data.body.content);
    };


	document.body.addEventListener('keydown', processInput);
	document.body.addEventListener('keyup', processInput);
});
