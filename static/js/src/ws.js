(function(app){
    app.connection = new WebSocket('ws://' + CONFIG.ws);

    // When the connection is open, send some data to the server
    app.connection.onopen = function () {
//        console.log('Connection opened')
    };

    // Log errors
    app.connection.onerror = function (error) {
//        console.log('WebSocket Error ', error);
    };
    // Log messages from the server
    app.connection.onmessage = function (e) {
        eval('var evaled = ' + e.data);
        //console.log('Server: ', evaled);
        app.process_server_signals(evaled);
    };

})(Rocketz);

