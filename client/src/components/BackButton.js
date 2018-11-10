import React, { Component } from 'react'
import { connect } from "react-redux"
import { View, Button, TextInput } from "react-native"
import { withNavigation } from "react-navigation"
import { getAllCategories } from "../actions/categoriesActions"
import { getAllExpenses } from "../actions/expensesActions"

class BackButton extends Component {

    render() {

        const { category, categoryId } = this.props
        const catId = parseInt(categoryId, 10)
        
        return (
            <View>
                <Button
                    title="Back"
                    onPress={() =>
                        {
                            category === "AllCategories" ? this.props.getAllCategories() : console.log("looking for expenses, not categories")
                            category === "AllExpenses" ? this.props.getAllExpenses(catId) : console.log("looking for categories, not expenses")
                            this.props.navigation.navigate(category)
                        }
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categoryId: state.categories[0].id
    }
}

const wrapNavigation = withNavigation(BackButton)

export default connect(mapStateToProps, { getAllCategories, getAllExpenses })(wrapNavigation)