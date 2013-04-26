(function(exports) {
    var defaults = {
        'selector': '.ft-page',
        'activeSelector': '.hilite.actual'
    },
    allOfThem;

    var Counter = function(options) {
        this.options = extend(defaults, options);
    };

    function extend(taker, giver) {
        var result = taker;
        for (var prop in giver) {
            if (giver.hasOwnProperty(prop)) {
                result[prop] = giver[prop];
            }
        }

        return result;
    }

    function getAllOfThem() {
        allOfThem = document.querySelectorAll(this.options.selector);
    }

    function getCurrent() {
        if (typeof allOfThem === 'undefined') {
            getAllOfThem();
        }

        return allOfThem.indexOf(this.options.activeSelector) + 1;
    }

    function getTotal() {
        return allOfThem.length;
    }

    Counter.prototype = {
        getCurrent: getCurrent,
        getTotal: getTotal
    };

    exports.Counter = Counter;
}(window));