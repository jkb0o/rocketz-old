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
        dispatch(evaled);
    };

    // TODO: Move to app
    function dispatch (data){
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

        var battle = app.stage.get('.battle')[0];

        if (data.body.content_type == "obj_created") {
            target = battle;
        }
        if (data.body.content_type == "move") {
            target = battle.get('.'+data.body.content.obj)[0]
        }
        if (data.body.content_type == "identify") {
            target = battle.get('.'+data.body.content.obj)[0]
        }

        if (!target){
            return;
        }
        target[data.body.content_type](data.body.content);
    }

})(Rocketz);

