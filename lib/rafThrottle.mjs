var rafThrottle = function rafThrottle(callback) {
  var requestId;
  var lastArgs;

  var later = function later(context) {
    return function () {
      requestId = null;
      callback.apply(context, lastArgs);
    };
  };

  var throttled = function throttled() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;

    if (requestId === null || requestId === undefined) {
      requestId = requestAnimationFrame(later(this));
    }
  };

  throttled.cancel = function () {
    cancelAnimationFrame(requestId);
    requestId = null;
  };

  return throttled;
};

export default rafThrottle;
