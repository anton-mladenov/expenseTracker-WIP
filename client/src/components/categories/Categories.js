import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import CategoriesForm from "./CategoriesForm"
import { createNewCategory } from "../../actions/categoriesActions"

class Categories extends Component {

    state = {
        showForm: false
    }

    showForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleSubmit = (data) => {
        this.props.createNewCategory(data.text)
    }

    render() {
        return (
            <View>

                <Text> EXPENSE CATEGORIES </Text>

                <Button
                    title="Add A New Category"
                    onPress={ this.showForm }
                />

                {
                    this.state.showForm &&
                    <CategoriesForm onSubmit={ this.handleSubmit } />
                }

            </View>
        )
    }
}

export default connect(null, { createNewCategory })(Categories)