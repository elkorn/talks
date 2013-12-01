/* module 3, tools */
function maybe (fn) {
  return function () {
    var i;

    if (arguments.length === 0) return;
    else {
      for (i = 0; i < arguments.length; ++i) {
        if (arguments[i] === null || typeof(arguments[i]) === "undefined") return;
      }
      return fn.apply(this, arguments);
    }
  };
}

function mapWith (fn) {
  return function (list) {
    return Array.prototype.map.call(list, function (something) {
      return fn.call(this, something);
    });
  };
};