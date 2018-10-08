import React, { Component } from 'react'
import { connect } from "react-redux"
import { View, Text, Button } from "react-native"
import CategoriesForm from "./CategoriesForm"
import { createNewCategory } from "../../actions/categories"

class Categories extends Component {

    handleSubmit = (data) => {
        const { category } = data
        console.log(" ____ TESTING from Categories Container! ", { data })
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