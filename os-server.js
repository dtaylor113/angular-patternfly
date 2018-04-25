'use strict';

var express = require('express');
var http = require('http');
var ipaddress = '0.0.0.0';
var port = '8080';

var app = express();

// A shutdown handler to log when we quit.
process.on('exit', function() {
    console.log('%s: INFO - Node server is shutting down.',
        Date(Date.now()));
});

try {
    app.use(express.static('./docs'));
    console.log('%s: INFO - Node server started on %s:%d ...',
        Date(Date.now()), ipaddress, port);
    http.createServer(app).listen(port, ipaddress);
}
catch (err) {
    console.log('%s: ERROR - Problem starting node server%s',
        Date(Date.now()), err);
}
