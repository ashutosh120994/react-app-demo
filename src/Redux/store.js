import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import auth from './auth.reducer';
import theme from './theme.reducer';

const reducer = combineReducers({ auth, theme });

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
);

const persistConfig = {
    key: 'rootState',
    storage,
    whitelist: [],
};

const rootReducer = persistReducer(persistConfig, reducer);

const store = createStore(rootReducer, {}, enhancer);
export default store;
