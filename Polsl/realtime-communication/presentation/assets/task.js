(function(window) {
    'use strict';

    function Task(id, taskFn) {
        this.selector = '#' + [].slice.call(document.querySelectorAll('[data-ex]')).filter(function(elem) {
            return parseInt(elem.getAttribute('data-ex'), 10) === id;
        })[0].id;
        this.start = function() {
            this.running = true;
            taskFn.call(this);
        };

        this.getId = function() {
            return id;
        };

        return this;
    }

    Task.prototype = {
        timers: [],
        running: false,
        selector: '',
        stop: function() {
            this.timers.forEach(clearTimeout);
            this.running = false;
        }
    };

    window.Task = Task;
}(window));