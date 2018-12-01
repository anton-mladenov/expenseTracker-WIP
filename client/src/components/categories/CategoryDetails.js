import React, { Component } from "react"
import { ScrollView, Text, StyleSheet, View } from "react-native"
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
            <ScrollView
                style={styles.background}
            >

                <View
                    style={{ flex:1,
                        flexDirection: "column",
                        alignItems:'center',
                        justifyContent:'center',
                        marginVertical: "15%",
                        marginTop: "30%"
                        }}
                >
                    <Text
                        style={{ 
                            fontSize: 45,
                            letterSpacing: 5,
                            color: styles.buttonTextColor.color
                        }}
                    > { oneCategory.name } </Text>
                    <Text
                        style={{ 
                            fontSize: 30,
                            marginTop: 30,
                            color: styles.buttonTextColor.color
                        }}
                    > Money out: { oneCategory.amount } </Text>
                </View>

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
                            marginVertical: 5, 
                            backgroundColor: styles.buttonBackground.backgroundColor
                        }}
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
                            marginVertical: 5, 
                            backgroundColor: styles.buttonBackground.backgroundColor
                        }}
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
                            marginVertical: 5, 
                            backgroundColor: styles.buttonBackground.backgroundColor
                        }}
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
        oneCategory: state.categories[0]
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#0B3954"
    },
    buttonBackground: {
        backgroundColor: "#00D0E5"
    },
    buttonTextColor: {
        color: "white"
    }
})

export default connect(mapStateToProps, { getOneCategory, deleteOneCategory, updateOneCategory, getAllCategories, createNewExpense })(CategoryDetails)





