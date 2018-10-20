import React, { Component } from 'react'
import { View, TextInput, Button } from "react-native"

export default class SignUpForm extends Component {

    state = {
        name: "",
        email: "",
        password: ""
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state)
        // this.props.navigation.navigate("Dashboard")
    }

    render() {
        return (
            <View>

                <TextInput
                    placeholder="write your name here"
                    onChangeText={ (name) => this.setState({ name }) }
                />

                <TextInput
                    placeholder="whatever your email address is"
                    onChangeText={ (email) => this.setState({ email }) }
                />

                <TextInput
                    placeholder="type your password now"
                    onChangeText={ (password) => this.setState({ password }) }
                />

                <Button
                    title="Let's Do It!"
                    onPress={ this.handleSubmit }
                />

            </View>
        )
    }
}
