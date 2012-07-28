$(function(){
    
    mask    = 0;

	stage	= new Kinetic.Stage({
		container	: 'workspace',
		width		: 1000,
		height		: 600
	});

	var back	= new Rocketz.background.main({name: 'background'});
	var battle	= new Rocketz.battle.main({name: 'battle'});

	stage.add(back);
	stage.add(battle);

	stage.onFrame(function(options){
		stage.clear();
		battle.update(options);
		stage.draw();
	})	

	stage.start()
	
	document.body.addEventListener('keydown', function(e){
		var code	= e.keyCode;
		var codes	= [null,87,65,83,68];
        
        for (var i = 0; i < codes.length; i++){
            var item    = codes[i];

            if (code != item)           continue;
            
            mask = mask | Math.pow(2, i);
        };

        connection.send(JSON.stringify({message: 'changeKeys', data: mask}));
	});

	document.body.addEventListener('keyup', function(e){
		var code	= e.keyCode;
		var codes	= [null,87,65,83,68];
        
        for (var i = 0; i < codes.length; i++){
            var item    = codes[i];

            if (code != item)           continue;

            mask -= Math.pow(2, i);
        };
        
        connection.send(JSON.stringify({message: 'changeKeys', data: mask}));
	});


});
