(function(app){
    app.connection = new WebSocket('ws://' + ROCKETZ_WEBSOCKET);

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
        data = JSON.parse(e.data);
        app.process_server_signals(data);
    };

})(Rocketz);

