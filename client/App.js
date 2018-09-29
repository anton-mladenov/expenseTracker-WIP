
import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation"
import HomeScreen from "./src/components/HomeScreen"
import DetailsScreen from "./src/components/DetailsScreen"
import { Provider } from "react-redux"
import store from "./store"

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
) 

export default class App extends Component {
  render() {
    return (
      // <Provider store={store}>
        <RootStack />
      // {/* </Provider> */}
    );
  }
}
