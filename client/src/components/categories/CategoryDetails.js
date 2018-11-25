import React, { Component } from "react"
import { ScrollView, Text } from "react-native"
import { connect } from "react-redux"
import { getOneCategory, deleteOneCategory, updateOneCategory, getAllCategories } from "../../actions/categoriesActions"
import CategoriesForm from "./CategoriesForm"
import ExpensesForm from "../expenses/ExpensesForm"
import Expenses from "../expenses/Expenses"
import { createNewExpense } from "../../actions/expensesActions"
import AllExpenses from "../expenses/AllExpenses"
import { Button, FAB, Card, Title, Divider } from 'react-native-paper';


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

        return (
            <ScrollView>

                <Text> { oneCategory.name } </Text>
                <Text> { oneCategory.amount } </Text>

                {
                    this.state.buttonsShow &&
                    <Button
                        onPress={ () => this.props.deleteOneCategory(itemId) }
                        mode="contained"
                        style={{ flex:1,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            marginHorizontal: 70,
                            marginVertical: 5, }}
                    >
                    Delete Category
                    </Button>
                }

                {
                    this.state.buttonsShow &&
                    <Button
                        onPress={ this.toggleEdit }
                        mode="contained"
                        style={{ flex:1,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            marginHorizontal: 70,
                            marginVertical: 5, }}
                    >
                    Edit Category
                    </Button>
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
                        onPress={ this.showAddExpenseForm }
                        mode="contained"
                        style={{ flex:1,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            marginHorizontal: 70,
                            marginVertical: 5, }}
                    >
                    Add New Expense
                    </Button>
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





