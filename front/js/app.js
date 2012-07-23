$(function(){
	mask		= 0;
	var stage	= new Kinetic.Stage({
		container	: 'workspace',
		width		: window.innerWidth-20,
		height		: window.innerHeight-35
	});
	
	var back	= createBack();
	var units	= createUnits();

	stage.add(back);
	stage.add(units);

	function createBack(){
		var back	= new Kinetic.Layer({name: 'back'});
		return back;
	};

	function createUnits(){
		var units	= new Kinetic.Layer({name: 'units'});
		
		var self	= new Kinetic.Polygon({
			points: [{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 10}],
			fill: 'black',
			stroke: 'red'
		});

		document.body.addEventListener('keydown', function(e){
			var code	= e.keyCode;
			var codes	= [87,65,83,68];

			codes.map(function(elem, i){if(elem === code && !(mask & Math.pow(2, i+1))) mask += Math.pow(2, i+1)});
			
			console.log(mask);	
			
		});

		document.body.addEventListener('keyup', function(e){
			var code	= e.keyCode;
			var codes	= [87,65,83,68];
			console.log('keyup')
			codes.map(function(elem, i){if(elem === code && mask & Math.pow(2, i+1)) mask -= Math.pow(2, i+1)});
		});

		units.add(self);
		return units;
	}
});
