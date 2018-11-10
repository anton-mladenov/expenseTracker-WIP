import React, { Component } from 'react'
import { ScrollView, Button, TextInput } from "react-native"
import { withNavigation } from "react-navigation"

class CategoriesForm extends Component {

    state = {}

    handleSubmit = () => {
        this.props.onSubmit(this.state)
    }

    render() {

        const initialValues = this.props.initialValues || {}

        return (
            <ScrollView>

                <TextInput
                    placeholder="Give A Name To Your New Category."
                    onChangeText={ (name) => this.setState({ name: name }) }
                    value={ this.state.name !== undefined ? this.state.name : initialValues.name }
                />

                <Button
                    title="Submit"
                    onPress={ this.handleSubmit }
                />

            </ScrollView>
        )
    }
}

const categoriesFormWithNav = withNavigation(CategoriesForm)

export default categoriesFormWithNav