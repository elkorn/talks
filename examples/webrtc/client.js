(function(argument) {
	var video,
	userMediaOpts = {
		audio: false,
		video: true
	};

	function hasGetUserMedia() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}

	function getURL() {
		return window.URL || window.webkitURL;
	}

	function handleVideo(stream) {
		video.src = window.URL.createObjectURL(stream);
	}

	function handleMediaError(error) {
		console.error(error);
	}

	function initializeMediaStream(callback, errback) {
		video = document.querySelector('video');
		navigator.getUserMedia(userMediaOpts, callback, errback);
	}

	if (hasGetUserMedia()) {
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		$(function() {
			initializeMediaStream(handleVideo, handleMediaError);
		});
	} else {
		alert('getUserMedia API is a no-go here. :(');
	}
}());