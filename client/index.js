/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from "react-redux"
import store from "./store"
import React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
    dark: true,
    roundness: 3,
    colors: {
        primary: "",
        accent: "",
        background: "#0B3954", 
        surface: "#00D0E5",
        text: "red",
        disabled: "gray", 
        placeholder: "",
        backdrop: ""
    },
    fonts: {
        regular: "",
        medium: "",
        light: "",
        thin: ""
    }
}

const AppContainer = () => {
    return (
        <Provider store={store}>
            {/* <PaperProvider theme={theme}> */}
            <PaperProvider>
                <App />
            </PaperProvider>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppContainer);
