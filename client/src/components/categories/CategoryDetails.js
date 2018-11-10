import React, { Component } from "react"
import { ScrollView, Text, Button } from "react-native"
import { connect } from "react-redux"
import { getOneCategory, deleteOneCategory, updateOneCategory, getAllCategories } from "../../actions/categoriesActions"
import CategoriesForm from "./CategoriesForm"
import ExpensesForm from "../expenses/ExpensesForm"
import Expenses from "../expenses/Expenses"
import { createNewExpense } from "../../actions/expensesActions"
import AllExpenses from "../expenses/AllExpenses"


class CategoryDetails extends Component {

    state = {
        toggleEdit: false,
        showExpenseForm: false,
        buttonsShow: true
    }

    componentDidMount() {
        const { navigation } = this.props
        const itemId = navigation.getParam('categoryId', 'NO-ID')
        this.props.getOneCategory(itemId)
    }

    toggleEdit = () => {
        this.setState({
            toggleEdit: !this.state.toggleEdit
        })
    }

    editCategory = (data) => {
        const { navigation } = this.props
        const itemId = navigation.getParam('categoryId', 'NO-ID')
        this.props.updateOneCategory(itemId, data.name)
    }

    showAddExpenseForm = () => {
        this.setState({
            showExpenseForm: !this.state.showExpenseForm,
            buttonsShow: !this.state.buttonsShow
        })
    }

    handleSubmit = (data) => {
        const { navigation } = this.props
        const itemId = navigation.getParam('categoryId', 'NO-ID')
        const { name, amount } = data
        const fullData = {
            name,
            amount,
            categoryId: itemId
        }
        this.props.createNewExpense(fullData)
        this.setState({
            buttonsShow: !this.state.buttonsShow,
            showExpenseForm: !this.state.showExpenseForm
        })
    }

    render() {

        const { oneCategory, navigation } = this.props
        const itemId = navigation.getParam('categoryId', 'NO-ID')
        console.log({itemId})

        return (
            <ScrollView>

                <Text> { oneCategory.name } </Text>
                <Text> { oneCategory.amount } </Text>

                {
                    this.state.buttonsShow &&
                    <Button
                        title="Delete This Category"
                        onPress={ () => this.props.deleteOneCategory(itemId) }
                    />
                }

                {
                    this.state.buttonsShow &&
                    <Button
                        title="Edit This Category"
                        onPress={ this.toggleEdit }
                    />
                }

                {
                    this.state.toggleEdit &&
                    <CategoriesForm
                        initialValues={ oneCategory }
                        onSubmit={ this.editCategory }
                    />
                }

                {
                    this.state.buttonsShow &&
                    <Button
                        title="Add A New Expense To This Category"
                        onPress={ this.showAddExpenseForm }
                    />
                }

                {
                    this.state.showExpenseForm &&
                    <ExpensesForm onSubmit={ this.handleSubmit } />
                }

                <Text> </Text>

                {
                    this.state.buttonsShow &&
                    <AllExpenses categoryId={ itemId } />
                }

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        oneCategory: state.categories
    }
}

export default connect(mapStateToProps, { getOneCategory, deleteOneCategory, updateOneCategory, getAllCategories, createNewExpense })(CategoryDetails)





