import React, { Component } from 'react'
import { Platform, StyleSheets, View, Text, Button } from "react-native"

export default class DetailsScreen extends Component {
  render() {
    return (
      <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> DETAILS SCREEN </Text>
        <Button 
        title="Take me to the Home Screen" 
        onPress={ () => this.props.navigation.navigate("Home") } />
      </View>
    )
  }
}
