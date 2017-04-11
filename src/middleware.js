import socketIO from 'socket.io'
import { combineReducers,
  compose,
  createStore
} from 'redux'
import { createReducer,
  createAppSchema,
  deleteNormalizerEntities,
  deleteNormalizerEntity,
  mergeNormalizerEntities,
  mergeNormalizerEntity
} from 'transactions-redux-normalizer'

export function useTransactionsExpressSocketio (server, config = {}) {
  // unpack
  const description = config.description || {}
  const NAME_SPACE = config.NAME_SPACE || '/transactions'
  // redux store
  const appSchema = createAppSchema(description)
  const normalizer = createReducer({ schema: appSchema })
  const rootReducer = combineReducers({ normalizer })
  const store = createStore(rootReducer)
  // socketio
  const socketioServer = socketIO(server)
  const nameSpace = socketioServer.of(NAME_SPACE)
  // events
  nameSpace.on('connection', socket => {
    console.log('a client connected')
    socket.on('disconnect', () => {
      console.log('client disconnected')
    })
    socket.on('connect_user', user => {
      store.dispatch(mergeNormalizerEntity('users', user.id, user))
    })
    socket.on('disconnect_user', userId => {
      store.dispatch(deleteNormalizerEntity('users', userId))
    })
  })
  // return
  return {
    socketioServer
  }
}
