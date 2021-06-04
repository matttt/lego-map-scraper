var app, server,
    express = require('express'),
    path = require('path'),
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
 
app = express();
app.use(function(req, res, next) { console.log(req.url); next(); });
app.use(express.static('public'));
server = app.listen(port, host, serverStarted);
 
function serverStarted () {
    console.log('Server started', host, port);
    console.log('Press Ctrl+C to exit...\n');
}