import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import ExpensesForm from "./ExpensesForm"
import { createNewExpense } from "../../actions/expensesActions"

class Expenses extends Component {

    state = {
        showCreateForm: false
    }

    showCreateForm = () => {
        this.setState({
            showCreateForm: !this.state.showCreateForm
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
            </View>
        )
    }
}

export default connect(null, { createNewExpense })(Expenses)