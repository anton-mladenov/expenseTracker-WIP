import React, { Component } from 'react'
import { View, Text } from "react-native"
import { connect } from "react-redux"
import CategoriesForm from "./CategoriesForm"
import { createNewCategory } from "../../actions/categoriesActions"

class Categories extends Component {

    handleSubmit = (data) => {
        this.props.createNewCategory(data.text)
    }

    render() {
        return (
            <View>

                <Text> EXPENSE CATEGORIES </Text>

                <CategoriesForm onSubmit={ this.handleSubmit } />

            </View>
        )
    }
}

export default connect(null, { createNewCategory })(Categories)