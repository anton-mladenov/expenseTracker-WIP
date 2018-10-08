
import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation"
import HomeScreen from "./src/components/HomeScreen"
import Categories from "./src/components/categories/Categories"

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Categories: Categories,
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
