
import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation"
import HomeScreen from "./src/components/HomeScreen"
import Categories from "./src/components/categories/Categories"
import SignUp from "./src/components/account/SignUp"

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Categories: Categories,
        SignUp: SignUp
    },
    {
        initialRouteName: "Home"
    }
)

export default class App extends Component {
    render() {
        return (
            <RootStack />
        )
    }
}
