import React, { Component } from 'react'
import { View, Button, TextInput } from "react-native"

export default class CategoriesForm extends Component {

    state = {
        text: ""
    }

    handleSubmit = () => {
        return this.props.onSubmit(this.state)
    }

    render() {
        return (
            <View>

                <TextInput
                    placeholder="Give A Name To Your New Category."
                    onChangeText={ (text) => this.setState({ text }) }
                />

                <Button
                    title="Create This Category!"
                    onPress={ this.handleSubmit }
                />

            </View>
        )
    }
}
