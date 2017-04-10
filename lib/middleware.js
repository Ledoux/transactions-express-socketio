'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTransactionsExpressSocketio = useTransactionsExpressSocketio;

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _redux = require('redux');

var _transactionsReduxNormalizer = require('transactions-redux-normalizer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useTransactionsExpressSocketio(server) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // unpack
  var description = config.description || {};
  var NAME_SPACE = config.NAME_SPACE || '/transactions';
  // redux store
  var appSchema = (0, _transactionsReduxNormalizer.createAppSchema)(description);
  var normalizer = (0, _transactionsReduxNormalizer.createReducer)({ schema: appSchema });
  var rootReducer = (0, _redux.combineReducers)({ normalizer: normalizer });
  var store = (0, _redux.createStore)(rootReducer);
  // socketio
  var socketioServer = (0, _socket2.default)(server);
  var nameSpace = socketioServer.of(NAME_SPACE);
  // events
  nameSpace.on('connection', function (socket) {
    console.log('a client connected');
    socket.on('disconnect', function () {
      console.log('client disconnected');
    });
    socket.on('connect_user', function (user) {
      store.dispatch((0, _transactionsReduxNormalizer.mergeNormalizerEntity)('users', user));
    });
    socket.on('disconnect_user', function (userId) {
      store.dispatch((0, _transactionsReduxNormalizer.deleteNormalizerEntity)('users', userId));
    });
  });
  // return
  return {
    socketioServer: socketioServer
  };
}