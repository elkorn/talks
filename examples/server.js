var express = require('./assets/node_modules/express/lib/express'),
	app = express(),
	comet = require('./comet/server'),
	sse = require('./sse/server'),
	reset = '\033[0m';

app.configure(function() {
	app.use(express.bodyParser());
});
app.get('/comet/work', comet.handleGet);
app.post('/comet/work', comet.handlePost);
app.get('/sse/work', sse.handleGet);
app.post('/sse/work', sse.handlePost);
app.use(express.static(__dirname));
app.set('views', __dirname);
app.listen(8000);
console.log('Running the server in expected environment.' + reset);