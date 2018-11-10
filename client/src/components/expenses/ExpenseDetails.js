import React, { Component } from 'react'
import { ScrollView, Text, Button } from "react-native"
import { connect } from "react-redux"
import { getOneExpense, editOneExpense, deleteOneExpense } from "../../actions/expensesActions"
import ExpensesForm from "./ExpensesForm"

class ExpenseDetails extends Component {

    state = {
        edit: false
    }

    componentDidMount() {
        const expenseId = this.props.navigation.getParam("expenseId")
        data = {
            // id: this.props.expenseId,
            id: expenseId,
            categoryId: this.props.category.id
        }
        this.props.getOneExpense(data)
    }

    handleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    handleSubmit = (data) => {
        const expenseId = this.props.navigation.getParam("expenseId")
        const newData = {
            name: data.name,
            amount: data.amount,
            expenseId: expenseId,
            categoryId: this.props.category.id
        }
        this.props.editOneExpense(newData)
    }

    render() {

        const { oneExpense, category } = this.props

        return (
            <ScrollView>

                <Text> { oneExpense.name } </Text>
                <Text> { oneExpense.amount } </Text>
                <Text> Added to Category: { category.name } </Text>

                <Button
                    title="Edit Expense"
                    onPress={ this.handleEdit }
                />
                
                {
                    this.state.edit &&
                    <ExpensesForm onSubmit={ this.handleSubmit } initialValues={ oneExpense } />
                }

                <Button
                    title="Delete Expense"
                    onPress={ () => this.props.deleteOneExpense({ id: oneExpense.id, categoryId: category.id }) }
                />

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        oneExpense: state.expensesReducer[0],
        category: state.categories[0]
    }
}

export default connect(mapStateToProps, { getOneExpense, editOneExpense, deleteOneExpense })(ExpenseDetails)

