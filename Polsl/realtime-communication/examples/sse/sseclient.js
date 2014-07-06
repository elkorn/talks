(function() {
	function SSEClient(req, res) {
		this.req = req;
		this.res = res;
		var self = this;
		this.res.on('close', function() {
			self.close();
		});

		return this;
	}

	SSEClient.prototype.initialize = function() {
		this.req.socket.setNoDelay(true);
		this.res.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive'
		});
	};

	SSEClient.prototype.send = function(data) {
		this.res.write('data:' + JSON.stringify(data) + '\n\n');
	};

	SSEClient.prototype.onClose = function(method) {
		this.res.on('close', method);
	};

	SSEClient.prototype.close = function() {
		this.res.end();
	};

	module.exports = SSEClient;
}());