import React, { Component } from 'react'
import { View, TextInput, Button } from "react-native"

export default class SignInForm extends Component {

    state = {
        email: "",
        password: ""
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state)
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="email ..."
                    onChangeText={ (email) => this.setState({ email }) }
                />

                <TextInput
                    placeholder="... and your password, please"
                    secureTextEntry={true}
                    onChangeText={ (password) => this.setState({ password }) }
                />

                <Button
                    title="Log In Now"
                    onPress={ this.handleSubmit }
                />

            </View>
        )
    }
}
