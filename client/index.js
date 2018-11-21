/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from "react-redux"
import store from "./store"
import React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// const theme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       primary: 'tomato',
//       accent: 'yellow',
//     },
// };

const AppContainer = () => {
    return (
        <Provider store={store}>
            <PaperProvider>
                <App />
            </PaperProvider>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppContainer);
