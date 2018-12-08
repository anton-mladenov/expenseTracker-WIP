import React, { Component } from 'react'
import { connect } from "react-redux"
import { View, TextInput, Image, Button } from "react-native"
import { withNavigation } from "react-navigation"
import { getAllCategories } from "../actions/categoriesActions"
import { getAllExpenses } from "../actions/expensesActions"
import { Appbar, } from 'react-native-paper';

class BackButton extends Component {

    _goBack = () => {
        const { category, categoryId, categories } = this.props
        const catId = parseInt(categoryId, 10)
        category === "AllCategories" ? this.props.getAllCategories() : console.log("looking for expenses, not categories")
        category === "AllExpenses" ? this.props.getAllExpenses(catId) : console.log("looking for categories, not expenses")
        if (categories.length > 1) {
            console.log({categories})
            return this.props.navigation.navigate("WelcomeScreen")
        }
        return this.props.navigation.goBack()
    }

    render() {
        return (
            <View>
                <Appbar.Header style={{ marginRight: 1000, backgroundColor: "#FF951C" }} >
                    <Appbar.BackAction
                        onPress={this._goBack}
                    />
                </Appbar.Header>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categoryId: state.categories[0].id,
        categories: state.categories
    }
}

const wrapNavigation = withNavigation(BackButton)

export default connect(mapStateToProps, { getAllCategories, getAllExpenses })(wrapNavigation)