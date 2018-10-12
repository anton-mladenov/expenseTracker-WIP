import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import ExpensesForm from "./ExpensesForm"
import { createNewExpense } from "../../actions/expensesActions"
import AllExpenses from "./AllExpenses"

class Expenses extends Component {

    state = {
        showCreateForm: false,
        showAllExpenses: false
    }

    showCreateForm = () => {
        this.setState({
            showCreateForm: !this.state.showCreateForm
        })
    }

    showAllExpenses = () => {
        this.setState({
            showAllExpenses: !this.state.showAllExpenses
        })
    }

    handleSubmit = (data) => {
        const { name, amount } = data
        const fullData = {
            name,
            amount,
            categoryId: this.props.categoryId
        }
        console.log("FULL DATA: ", fullData)
        this.props.createNewExpense(fullData)
    }

    render() {
        return (
            <View>

                <Button
                    title="Add A New Expense"
                    onPress={ this.showCreateForm }
                />

                {
                    this.state.showCreateForm &&
                    <ExpensesForm onSubmit={ this.handleSubmit } />
                }

                <Button
                    title="See All Expenses"
                    onPress={ this.showAllExpenses }
                />

                {
                    this.state.showAllExpenses &&
                    <AllExpenses />
                }


            </View>
        )
    }
}

export default connect(null, { createNewExpense })(Expenses)