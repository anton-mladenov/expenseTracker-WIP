import React, { Component } from 'react'
import { Platform, StyleSheets, View, Text, Button } from "react-native"
import { sendTest } from "../actions/testActions"
import { connect } from "react-redux"
import store from "../../store"

class DetailsScreen extends Component {

  componentDidMount() {
    store.dispatch(this.props.sendTest())
  }

  render() {
    const { test } = this.props
    
    return (
      <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> DETAILS SCREEN </Text>

        <Text> { this.test } </Text>
 
        <Button 
        title="Take me to the Home Screen" 
        onPress={ () => this.props.navigation.navigate("Home") } />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    test: state.testReducer
  }
}

export default connect(mapStateToProps, { sendTest })(DetailsScreen)