(function() {
	var clients = [],
		SSEClient = require('./sseclient');

	function splat(fn) {
		return function(list) {
			return Array.prototype.map.call(list, fn);
		};
	}

	function lpartial(fn /*, largs...*/ ) {
		var slice = Array.prototype.slice,
			largs = slice.call(arguments, 1);
		return function() {
			return fn.apply(this, largs.concat(slice.call(arguments, 0)));
		};
	}

	function registerClient(req, res) {
		var client = new SSEClient(req, res);
		client.initialize();
		client.onClose(function() {
			clients.splice(clients.indexOf(this), 1);
			console.log('no. of clients after removal: ', clients.length);
		});
		clients.push(client);
	}

	function writeSSE(data, client) {
		client.send(data);
	}

	exports.handleGet = function(req, res) {
		if (req.headers.accept && req.headers.accept == 'text/event-stream') {
			registerClient(req, res);
		}
	};

	exports.handlePost = function(req, res) {
		var data = req.body;
		res.writeHead(200, {
			"Content-Type": "text/plain"
		});

		res.end("ok");
		if (data.hasOwnProperty('top') && data.hasOwnProperty('left')) {
			splat(lpartial(writeSSE, data))(clients);
		}
	};
}());