import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import { getOneExpense } from "../../actions/expensesActions"

class ExpenseDetails extends Component {

    data = {
        id: this.props.expenseId,
        categoryId: this.props.category.id
    }


    componentDidMount() {
        this.props.getOneExpense(this.data)
    }

    render() {

        const { oneExpense, category } = this.props

        return (
            <View>

                <Text> { oneExpense.name } </Text>
                <Text> { oneExpense.amount } </Text>
                <Text> Added to Category: { category.name } </Text>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        oneExpense: state.expensesReducer,
        category: state.categories[0]
    }
}

export default connect(mapStateToProps, { getOneExpense })(ExpenseDetails)

