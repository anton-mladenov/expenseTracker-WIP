import { createStore, combineReducers, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"
import { composeWithDevTools } from "remote-redux-devtools"
import reducers from "./src/reducers/index"

const reducer = combineReducers(reducers)

const enhancer = composeWithDevTools(
    applyMiddleware(ReduxThunk)
)

const store = createStore(reducer, enhancer)

export default store