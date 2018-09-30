import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import ReduxThunk from "redux-thunk"
import { composeWithDevTools } from "remote-redux-devtools"
import reducers from "./src/reducers/index"

const reducer = combineReducers(reducers)

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f

const enhancer = compose(
    applyMiddleware(ReduxThunk),
    devTools
)

const store = createStore(reducer, enhancer);

export default store
