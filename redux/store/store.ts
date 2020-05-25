import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';

import { rootReducer } from '../reducers/index';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: []
};

const middlewares = [thunk, createLogger()]

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(...middlewares)
);

let persistor = persistStore(store);

export {
    store,
    persistor
};