import React, { Component } from 'react'
import { View, Button, TextInput } from "react-native"

export default class ExpensesForm extends Component {

    state = {}

    handleSubmit = () => {
        return this.props.onSubmit(this.state)
    }

    render() {

        const initialValues = this.props.initialValues || {}

        return (
            <View>

                <TextInput
                    placeholder="so... what did you buy?"
                    onChangeText={ (name) => this.setState({ name: name }) }
                    value={ this.state.name !== undefined ? this.state.name : initialValues.name }
                />

                <TextInput
                    placeholder="...and how much does that cost?"
                    onChangeText={ (amount) => this.setState({ amount: amount }) }
                    value={ this.state.amount !== undefined ? this.state.amount : initialValues.amount.toString() }
                />

                <Button
                    title="Submit"
                    onPress={ this.handleSubmit }
                />

            </View>
        )
    }
}
