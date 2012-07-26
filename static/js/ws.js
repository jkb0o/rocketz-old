connection = new WebSocket('ws://localhost:31337');

// When the connection is open, send some data to the server
connection.onopen = function () {
    console.log('Connection opened')
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log('Server: ' + e.data);
};

