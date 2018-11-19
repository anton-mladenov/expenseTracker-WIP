import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import ReduxThunk from "redux-thunk"
import reducers from "./src/reducers/index"
import { persistStore, persistReducer } from "redux-persist"
import { AsyncStorage } from "react-native"
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    timeout: 0,
    key: "root",
    storage,
    whitelist: ["currentUserReducer"],
    blacklist: ["categories", "expensesReducer", "signUpReducer", "loginReducer"]
}

const reducer = combineReducers(reducers)

const persistedReducer = persistReducer(persistConfig, reducer)

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f

const enhancer = compose(
    applyMiddleware(ReduxThunk),
    devTools,
)

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store)
