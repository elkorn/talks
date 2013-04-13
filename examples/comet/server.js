(function() {
	var requests = [],
		timestamps = [];

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

	function after(decoration) {
		return function(method) {
			return function() {
				var result = method.apply(this, arguments);
				decoration.apply(this, arguments);
				return result;
			};
		};
	}

	function refreshRequests() {
		// close out requests older than 30 seconds
		var expiration = new Date().getTime() - 30000;
		for (var i = timestamps.length - 1; i >= 0; i--) {
			if (timestamps[i] < expiration) {
				requests[i].res.writeHead(200, {
					"Content-Type": "text/plain"
				});
				requests[i].res.end("ok");
				requests.splice(i,1);
				timestamps.splice(i,1);
			}
		}
	}

	setInterval(refreshRequests, 1000);

	function respondWith(contentType, data, req) {
		req.res.end(JSON.stringify(data));
	}

	function dispose(request) {
		var i = requests.indexOf(request);
		requests.splice(i,1);
		timestamps.splice(i,1);
	}

	exports.handleGet = function(req, res) {
		requests.push(req);
		timestamps.push(new Date().getTime());
	};

	exports.handlePost = function(req, res) {
		var data = req.body;
		res.writeHead(200, {
			"Content-Type": "text/plain"
		});

		res.end("ok");
		if (data.hasOwnProperty('top') && data.hasOwnProperty('left')) {
			splat(after(dispose)(lpartial(respondWith, 'application/json', data)))(requests);
		}
	};
}());