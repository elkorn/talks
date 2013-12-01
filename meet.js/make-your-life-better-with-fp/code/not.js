function not(fn) {
	var context = this;
	return function() {
		return !fn.apply(context, arguments);
	}
}

function isItWeekendYet() {
	return new Date().getDay() % 6 === 0;
}

var shouldIGoToWork = not(isItWeekendYet);
