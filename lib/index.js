'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _use = require('./use');

Object.keys(_use).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _use[key];
    }
  });
});