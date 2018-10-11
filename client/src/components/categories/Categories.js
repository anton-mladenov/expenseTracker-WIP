import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import CategoriesForm from "./CategoriesForm"
import { createNewCategory } from "../../actions/categoriesActions"
import AllCategories from "./AllCategories"

class Categories extends Component {

    state = {
        showForm: false,
        showAddButton: true,
        showAllButton: true,
        showAllCategories: false,
    }

    showAddForm = () => {
        this.setState({
            showForm: !this.state.showForm,
            showAddButton: !this.state.showAddButton,
            showAllButton: !this.state.showAllButton,
        })
    }

    showAllForm = () => {
        this.setState({
            showAddButton: !this.state.showAddButton,
            showAllButton: !this.state.showAllButton,
            showAllCategories: !this.state.showAllCategories
        })
    }

    handleSubmit = (data) => {
        this.props.createNewCategory(data.text)
    }

    render() {
        return (
            <View>

                <Text> EXPENSE CATEGORIES </Text>
                <Text> { } </Text>
                {
                    this.state.showAddButton &&
                    <Button
                        title="Add A New Category"
                        onPress={ this.showAddForm }
                    />
                }
                <Text> { } </Text>
                {
                    this.state.showAllButton &&
                    <Button
                        title="All Categories"
                        onPress={ this.showAllForm }
                    />
                }

                <Text> { } </Text>
                {
                    this.state.showForm &&
                    <CategoriesForm onSubmit={ this.handleSubmit } />
                }
                <Text> { } </Text>
                {
                    this.state.showAllCategories &&
                    <AllCategories />
                }

            </View>
        )
    }
}

export default connect(null, { createNewCategory })(Categories)