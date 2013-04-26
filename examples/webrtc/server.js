(function() {
	var io = require('socket.io'),
		hub;

	function handleData(data) {
		console.log('em');
		hub.emit('data', data);
	}

	function registerClient(client) {
		console.log('registerClient');
		client.on('data', handleData);
	}

	module.exports = function(server) {
		hub = io.listen(server).of('/websocket/work');
		hub.on('connection', registerClient);
	};
}());