import { createStore, applyMiddleware, compose,  } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { autoRehydrate, persistStore, getStoredState } from 'redux-persist';
import { REHYDRATE } from 'redux-persist/constants';

// import redux-saga middleware and runner
import createSagaMiddleware from 'redux-saga';
// import root saga for run
import rootSaga from './sagas/';

import AppReducers from './reducers/index';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// create middleware array for better cluster all middleware in one place
const middleware = [ sagaMiddleware ];
// if the env is production, prohibit logger middleware
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}


// create redux-store | single source of truth
const store = createStore(
  AppReducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(...middleware),
  )
);

// saga runner
sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store, { storage: AsyncStorage, whitelist: ['token'] }, () => {
//   console.log('completed');
// })

export default store;