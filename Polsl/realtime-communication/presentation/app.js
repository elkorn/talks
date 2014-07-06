(function() {
    var counter = new Counter();

    function updateSlideCount() {
        document.getElementById('count').innerHTML = [counter.getCurrent(), '/', counter.getTotal()].join();
    }

    window.onhashchange = updateSlideCount;
    updateSlideCount();
}());