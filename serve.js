let app,
    express = require('express'),
    port = 3000
 
app = express();
app.use(express.static('public'));
app.listen(port, serverStarted);
 
function serverStarted () {
    console.log('Server started on port', port);
}