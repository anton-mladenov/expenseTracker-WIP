import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import SignInForm from "./SignInForm"
import { newSignIn } from "../../actions/usersActions"

class SignIn extends Component {

    handleSubmit = (data) => {
        console.log(" __ FROM SIGN IN COMP: ", { data })
        this.props.newSignIn(data)
    }

    render() {
        return (
            <View>

                <Text> SIGN IN </Text>

                <SignInForm onSubmit={ this.handleSubmit } />

            </View>
        )
    }
}

export default connect(null, { newSignIn })(SignIn)