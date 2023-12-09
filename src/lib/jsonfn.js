const jsonfn = {
  stringify(obj) {
    return JSON.stringify(obj, function (key, value) {
      if (typeof value === 'function') {
        const isAsync = value.constructor.name === 'AsyncFunction';
        return isAsync ? '__async_fn__:' + value.toString() : value.toString();
      }

      return value;
    });
  },

  parse(str) {
    return JSON.parse(str, function (key, value) {
      if (typeof value !== 'string') {
        return value;
      }

      // arrow functions hack
      if (value.startsWith('(models)')) {
        return eval(value);
      }

      if (value.substring(0, 13) === '__async_fn__:') {
        return eval('(' + value.substring(13) + ')');
      }

      if (value.substring(0, 8) === 'function') {
        return eval('(' + value + ')');
      }

      return value;
    });
  }
};

module.exports = jsonfn;