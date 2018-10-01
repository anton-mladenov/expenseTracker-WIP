import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import ReduxThunk from "redux-thunk"
import reducers from "./src/reducers/index"

const reducer = combineReducers(reducers)

// const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose // this SHOULD be working but it's not :D

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f // this SHOULDN'T be working but is :D :D 

const enhancer = compose(
    applyMiddleware(ReduxThunk),
    devTools
)

const store = createStore(reducer, enhancer);

export default store



// import { composeWithDevTools } from 'redux-devtools-extension' // use for react-native-debugger

// if (__DEV__) {
//     store = createStore(rootReducer, composeWithDevTools(...enhancers))
//     } else {
//        store = createStore(rootReducer, compose(...enhancers))
//     }