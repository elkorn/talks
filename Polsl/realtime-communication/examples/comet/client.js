(function(argument) {
	var server = "/comet/work",
		box;

	function postMovement(e, ui) {
		$.post(server, ui.position);
	}

	function communicate() {
		$.get(server, handleResponse);
	}

	function handleResponse(data) {
		hideError();
		if (data !== "ok") {
			data = JSON.parse(data);
			box.css({
				top: parseInt(data.top, 10),
				left: parseInt(data.left, 10)
			});
		}
		
		communicate();
	}

	function enableFaultMode() {
		showError();
		setTimeout(communicate, 1000);
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
			/*start:*/
			drag: postMovement
			/*stop: postMovement*/
		});

		communicate();
	});
}());