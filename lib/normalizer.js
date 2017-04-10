'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transactionsReduxNormalizer = require('transactions-redux-normalizer');

var _schemas = require('../schemas');

var normalizer = (0, _transactionsReduxNormalizer.createReducer)({ schema: _schemas.appSchema });

exports.default = normalizer;