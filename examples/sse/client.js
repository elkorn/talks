(function(argument) {
	var server = "work",
		box,
		source = new EventSource(server);

	source.addEventListener('message', handleResponse);
	source.addEventListener('error', showError);
	source.addEventListener('open', function(e) {
		console.log('SSE stream open.');
		hideError();
	});

	function postMovement(e, ui) {
		$.post(server, ui.position);
	}

	function testSource() {
		if (typeof source !== 'undefined') {
			setTimeout(testSource, 100);
		} else {
			console.log('source is null :(');
		}
	}

	testSource();

	function handleResponse(e) {
		hideError();
		var data = e.data;
		if (data !== "ok") {
			data = JSON.parse(data);
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