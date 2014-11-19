var Hapi = require('hapi');
var routes = require('./routes');

var server = new Hapi.Server('localhost', 8000);

// Add the routes
server.route(routes);

server.start();