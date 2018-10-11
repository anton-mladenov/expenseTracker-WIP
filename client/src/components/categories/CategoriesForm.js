import React, { Component } from 'react'
import { View, Button, TextInput } from "react-native"

export default class CategoriesForm extends Component {

    state = {}

    handleSubmit = () => {
        return this.props.onSubmit(this.state)
    }

    render() {

        const initialValues = this.props.initialValues || {}

        return (
            <View>

                <TextInput
                    placeholder="Give A Name To Your New Category."
                    onChangeText={ (name) => this.setState({ name: name }) }
                    value={ this.state.name !== undefined ? this.state.name : initialValues.name }
                />

                <Button
                    title="Submit"
                    onPress={ this.handleSubmit }
                />

            </View>
        )
    }
}
