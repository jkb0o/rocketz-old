$(function(){
	
	stage	= new Kinetic.Stage({
		container	: 'workspace',
		width		: 1000,
		height		: 600
	});

	console.log(stage)

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
			var codes	= [87,65,83,68];

			codes.map(function(elem, i){if(elem === code && !(mask & Math.pow(2, i+1))) mask += Math.pow(2, i+1)});
			
			
		});

		document.body.addEventListener('keyup', function(e){
			var code	= e.keyCode;
			var codes	= [87,65,83,68];
			console.log('keyup')
			codes.map(function(elem, i){if(elem === code && mask & Math.pow(2, i+1)) mask -= Math.pow(2, i+1)});
		});


});
