(function(argument) {
	var server = "work",
		box,
		socket = io.connect('http://localhost:8000/websocket/work');

	socket.on('connect', function() {
		hideError();
		console.log('WebSocket connected.');
	});

	socket.on('disconnect', enableFaultMode);
	socket.on('connect_failed', enableFaultMode);

	socket.on('data', handleResponse);

	function postMovement(e, ui) {
		socket.emit('data', ui.position);
	}

	function handleResponse(data) {
		hideError();
		if (data !== "ok") {
			box.css({
				top: parseInt(data.top, 10),
				left: parseInt(data.left, 10)
			});
		}
	}

	function enableFaultMode() {
		showError();
	}

	function showError() {
		$('#disco_error').show('fast');
	}

	function hideError() {
		$('#disco_error').hide('fast');
	}

	$(function() {
		$(document).ajaxError(enableFaultMode);
		box = $(".moving-box").draggable({
			containment: 'parent',
			drag: postMovement
		});
	});
}());