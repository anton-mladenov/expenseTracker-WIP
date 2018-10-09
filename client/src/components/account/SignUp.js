import React, { Component } from 'react'
import { View, Text } from "react-native"
import { connect } from "react-redux"
import SignUpForm from "./SignUpForm"
import { newSignUp } from "../../actions/usersActions"

class SignUp extends Component {

    handleSubmit = (data) => {
        this.props.newSignUp(data)
    }

    render() {
        return (
            <View>

                <Text> Create Your Account </Text>

                <SignUpForm onSubmit={ this.handleSubmit } />

            </View>
        )
    }
}

export default connect(null, { newSignUp })(SignUp)