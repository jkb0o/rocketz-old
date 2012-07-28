connection = new WebSocket('ws://' + CONFIG.ws);

// When the connection is open, send some data to the server
connection.onopen = function () {
    console.log('Connection opened')
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ', error);
};

// Log messages from the server
connection.onmessage = function (e) {
  
  eval('var evaled = ' + e.data);
  console.log('Server: ', evaled);
  dispatch(evaled)
};

function dispatch (data){
	var target	= null;

	if (data.message == "obj_created") target = stage.get('.battle')[0];
	if (data.message == "move") {
		target = stage.get('.battle')[0].get('.'+data.data.obj)[0]
	}
	if (!target)	return;
	target[data.message](data.data);
	//console.log("target."+data.message+"("+data.data+")");
}

