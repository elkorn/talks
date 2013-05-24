(function(window, Task) {
    'use strict';
    var tasks = [],
        ANIM_SPEED = 1,
        current = {
            section: -1,
            page: -1
        };

    function handleSlideChange(e) {
        var match = matchTaskId.bind(undefined, e.currentSlide);
        tasks.filter(not(match)).forEach(function(task) {
            task.stop();
        });
        tasks.filter(match).forEach(function(task) {
            task.start();
        });
    }

    function not(fn) {
        return function() {
            return !fn.apply(undefined, arguments);
        };
    }

    function speed() {
        return 1000 / ANIM_SPEED;
    }

    function matchTaskId(src, tgt) {
        return tgt.getId() === parseInt(src.getAttribute('data-ex'), 10);
    }

    function ex11() {
        var self = this,
            reqSelect = this.selector + ' .request-arrow',
            resSelect = this.selector + ' .response-arrow';

        function request() {
            var resetRequest = move(reqSelect)
                .set('top', '250px')
                .set('opacity', 1)
                .duration(0);
            var moveRequest = move(reqSelect)
                .duration(speed())
                .set('top', '100px')
                .set('opacity', 0);
            resetRequest.then(moveRequest).end();
            if (self.running) {
                self.timers[0] = setTimeout(response, speed());
            }
        }

        function response() {
            var resetResponse = move(resSelect)
                .set('top', '100px')
                .set('opacity', 1)
                .duration(0);
            var moveResponse = move(resSelect)
                .duration(speed())
                .set('top', '250px')
                .set('opacity', 0);
            resetResponse.then(moveResponse).end();
            if (self.running) {
                self.timers[0] = setTimeout(request, speed());
            }
        }

        request();
    }

    function ex12() {
        var self = this,
            reqSelect = this.selector + ' .request-arrow',
            resSelect = this.selector + ' .response-arrow',
            lpReqSelect = this.selector + ' .lp-req-arrow',
            lpResSelect = this.selector + ' .lp-res-arrow';

        function request() {
            var resetRequest = move(reqSelect)
                .set('top', '250px')
                .set('opacity', 1)
                .duration(0);
            var moveRequest = move(reqSelect)
                .duration(speed())
                .set('top', '100px')
                .set('opacity', 0);
            resetRequest.then(moveRequest).end();
            if (self.running) {
                self.timers[0] = setTimeout(response, speed());
            }
        }

        function response() {
            var resetResponse = move(resSelect)
                .set('top', '100px')
                .set('opacity', 1)
                .duration(0);
            var moveResponse = move(resSelect)
                .duration(speed())
                .set('top', '250px')
                .set('opacity', 0);
            resetResponse.then(moveResponse).end();
            if (self.running) {
                self.timers[0] = setTimeout(request, speed());
            }
        }

        function lpResponse() {
            var resetLpResponse = move(lpResSelect)
                .rotate(0)
                .set('opacity', 1)
                .duration(0);
            var moveLpResponse = move(lpResSelect)
                .duration(speed())
                .rotate(180)
                .set('opacity', 0);
            resetLpResponse.then(moveLpResponse).end();
            if (self.running) {
                self.timers[1] = setTimeout(lpRequest, speed());
            }
        }

        function lpRequest() {
            var resetLpRequest = move(lpReqSelect)
                .rotate(180)
                .set('opacity', 1)
                .duration(0);
            var moveLpRequest = move(lpReqSelect)
                .duration(speed())
                .rotate(360)
                .set('opacity', 0);
            resetLpRequest.then(moveLpRequest).end();
            if (self.running) {
                self.timers[1] = setTimeout(lpResponse, speed());
            }
        }

        request();
        lpRequest();
    }

    function ex13() {
        var self = this,
            reqSelect = this.selector + ' .request-arrow',
            resSelect = this.selector + ' .response-arrow',
            lpReqSelect = this.selector + ' .lp-req-arrow',
            lpResSelect = this.selector + ' .lp-res-arrow';

        function request() {
            var resetRequest = move(reqSelect)
                .set('top', '250px')
                .set('opacity', 1)
                .duration(0);
            var moveRequest = move(reqSelect)
                .duration(speed())
                .set('top', '100px')
                .set('opacity', 0);
            resetRequest.then(moveRequest).end();
            if (self.running) {
                self.timers[0] = setTimeout(response, speed());
            }
        }

        function response() {
            var resetResponse = move(resSelect)
                .set('top', '100px')
                .set('opacity', 1)
                .duration(0);
            var moveResponse = move(resSelect)
                .duration(speed())
                .set('top', '250px')
                .set('opacity', 0);
            resetResponse.then(moveResponse).end();
            if (self.running) {
                self.timers[0] = setTimeout(request, speed());
            }
        }

        function lpResponse() {
            var resetLpResponse = move(lpResSelect)
                .rotate(0)
                .set('opacity', 1)
                .duration(0);
            var moveLpResponse = move(lpResSelect)
                .duration(speed())
                .rotate(180)
                .set('opacity', 0);
            resetLpResponse.then(moveLpResponse).end();
            if (self.running) {
                self.timers[1] = setTimeout(lpResponse, speed());
            }
        }

        function lpRequest() {
            var resetLpRequest = move(lpReqSelect)
                .rotate(180)
                .set('opacity', 1)
                .duration(0);
            var moveLpRequest = move(lpReqSelect)
                .duration(speed())
                .rotate(360)
                .set('opacity', 0);
            resetLpRequest.then(moveLpRequest).end();
            if (self.running) {
                self.timers[1] = setTimeout(lpResponse, speed());
            }
        }

        request();
        lpRequest();
    }

    function ex14(){
            var self = this,
            channel = this.selector + ' .channel';

        function request() {
            var useChannel = move(channel)
                .set('background-color', 'lightgreen')
                .duration(speed() / 3);
            var resetChannel = move(channel)
                .set('background-color', '#00003d')
                .duration(speed() / 3);
            useChannel.then(resetChannel).end();
            if (self.running) {
                self.timers[0] = setTimeout(response, speed());
            }
        }

        function response() {
            var useChannel = move(channel)
                .set('background-color', 'red')
                .duration(speed() / 3);
            var resetChannel = move(channel)
                .set('background-color', '#00003d')
                .duration(speed() / 3);
            useChannel.then(resetChannel).end();
            if (self.running) {
                self.timers[0] = setTimeout(request, speed());
            }
        }

        request();
    }

    tasks.push(new Task(1, ex11));
    tasks.push(new Task(2, ex12));
    tasks.push(new Task(3, ex13));
    tasks.push(new Task(4, ex14));

    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,

        theme: Reveal.getQueryHash().theme || 'beige',
        transition: Reveal.getQueryHash().transition || 'beige',

        // Optional libraries used to extend on reveal.js
        dependencies: [{
                src: 'lib/js/classList.js',
                condition: function() {
                    return !document.body.classList;
                }
            }, {
                src: 'plugin/markdown/marked.js',
                condition: function() {
                    return !!document.querySelector('[data-markdown]');
                }
            }, {
                src: 'plugin/markdown/markdown.js',
                condition: function() {
                    return !!document.querySelector('[data-markdown]');
                }
            }, {
                src: 'plugin/highlight/highlight.js',
                async: true,
                callback: function() {
                    hljs.initHighlightingOnLoad();
                }
            }, {
                src: 'plugin/zoom-js/zoom.js',
                async: true,
                condition: function() {
                    return !!document.body.classList;
                }
            }, {
                src: 'plugin/notes/notes.js',
                async: true,
                condition: function() {
                    return !!document.body.classList;
                }
            }
        ]
    });

    Reveal.addEventListener('slidechanged', handleSlideChange);
}(window, window['Task']));