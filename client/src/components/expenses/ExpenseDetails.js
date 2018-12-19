import React, { Component } from 'react'
import { ScrollView, View, StyleSheet } from "react-native"
import { connect } from "react-redux"
import { getOneExpense, editOneExpense, deleteOneExpense } from "../../actions/expensesActions"
import ExpensesForm from "./ExpensesForm"
import { Text, Button, withTheme, ThemeProvider } from "react-native-paper"
import { addAndroidBackListener, removeAndroidBackListener } from "../AndroidBackButton"

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
        addAndroidBackListener(this.goBack)
    }

    componentWillUnmount() {
        removeAndroidBackListener(this.goBack)
    }

    goBack = async () => {
        const { category } = this.props
        await this.props.navigation.push("CategoryDetails", {
            categoryId: category.id
        })
    }

    handleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    handleDelete = () => {
        const { oneExpense, category } = this.props
        this.props.deleteOneExpense({ id: oneExpense.id, categoryId: category.id })
        this.props.navigation.push("AllCategories")
    }
    
    handleSubmit = (data) => {
        const expenseId = this.props.navigation.getParam("expenseId")
        const categoryId = this.props.navigation.getParam("categoryId")
        const newData = {
            name: data.name,
            amount: data.amount,
            expenseId: expenseId,
            categoryId: this.props.category.id
        }
        console.log({newData})
        this.props.editOneExpense(newData)
    }

    render() {

        const { oneExpense, category } = this.props
        // let stringy = this.props.oneExpense.amount.toString()
        // oneExpense.amount = stringy

        return (
            <ScrollView
                style={styles.background}
            >
                
                <View
                    style={{ flex:1,
                        flexDirection: "column",
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >

                    {
                        oneExpense && 
                        <Text
                            style={{ 
                                fontSize: 45,
                                letterSpacing: 5,
                                marginTop: 80,
                                marginBottom: 20,
                                color: styles.buttonTextColor.color
                            }}
                        > { oneExpense.name } </Text>
                    }
                    
                    {
                        category &&
                        <Text
                        style={{ 
                            fontSize: 15,
                            fontStyle: "italic",
                            lineHeight: 30,
                            color: "#FF951C"
                        }}
                        > Added to Category: { category.name } </Text>
                    }

                    {
                        oneExpense &&
                        <Text
                            style={{ 
                                fontSize: 30,
                                marginTop: 30,
                                marginBottom: 30,
                                color: styles.buttonTextColor.color
                            }}
                        > 
                        Money out: { oneExpense.amount !== 0 ? oneExpense.amount : 0 } 
                        </Text>
                    }

                </View>
                
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column"
                    }}
                >

                        <Button
                        mode="contained"
                        onPress={ this.handleEdit }
                        style={{ flex:1,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            marginHorizontal: 60,
                            marginVertical: 5,
                            backgroundColor: "#FF951C", 
                            color: styles.buttonTextColor.color,
                            borderBottomWidth: 0.3,
                            borderRightWidth: 0.3,
                            borderColor: "white"
                        }}
                        > Edit Expense </Button>
                    
                    {
                        this.state.edit &&
                        <ExpensesForm onSubmit={ this.handleSubmit } initialValues={ oneExpense } />
                    }

                    <Button
                        mode="contained"
                        onPress={ this.handleDelete }
                        style={{ flex:1,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            marginHorizontal: 60,
                            marginVertical: 5,
                            backgroundColor: "#FF951C", 
                            color: styles.buttonTextColor.color,
                            borderBottomWidth: 0.3,
                            borderRightWidth: 0.3,
                            borderColor: "white"
                        }}
                        > Delete Expense </Button>
                </View>

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

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#0B3954",
    },
    buttonBackground: {
        backgroundColor: "#00D0E5"
    },
    buttonTextColor: {
        color: "white"
    }
})

const thisComponentWithTheme = withTheme(ExpenseDetails)

export default connect(mapStateToProps, { getOneExpense, editOneExpense, deleteOneExpense })(thisComponentWithTheme)

