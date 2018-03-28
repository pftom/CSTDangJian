import { createStore, applyMiddleware, compose,  } from 'redux';
import { createLogger } from 'redux-logger';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import redux-saga middleware and runner
import createSagaMiddleware from 'redux-saga';
// import root saga for run
import rootSaga from './sagas/';

import rootReducer from './reducers/index';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// create middleware array for better cluster all middleware in one place
const middleware = [ sagaMiddleware ];

// if the env is production, prohibit logger middleware
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

// redux-persist config
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


// create redux-store | single source of truth
const store = createStore(
  persistedReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(...middleware),
  )
);
const persistor = persistStore(store);

// saga runner
sagaMiddleware.run(rootSaga);

export default store;
export {
  persistor,
}