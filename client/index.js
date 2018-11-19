/** @format */

import { AppRegistry, ActivityIndicator, View } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from "react-redux"
import { store, persistor } from "./store"
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'

const AppContainer = () => {
    
    renderLoadingScreen = () => {
        <View>
            <ActivityIndicator size="large" />
        </View>
    }
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={this.renderLoadingScreen()}>
                <App />
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppContainer);
