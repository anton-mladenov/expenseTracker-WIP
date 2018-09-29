import React, { Component } from 'react'
import { Platform, StyleSheets, View, Text, Button } from "react-native"

export default class HomeScreen extends Component {
  render() {
    return (
      <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> HOME SCREEN </Text>
        <Button   
        title="Take me to the Details Screen" 
        onPress={ () => this.props.navigation.navigate("Details") } />
      </View>
    )
  }
}
