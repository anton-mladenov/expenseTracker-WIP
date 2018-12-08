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
        await this.props.navigation.push("CategoryDetails")
    }

    handleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    handleDelete = () => {
        const { oneExpense, category } = this.props
        this.props.deleteOneExpense({ id: oneExpense.id, categoryId: category.id })
        this.props.navigation.navigate("CategoryDetails", {
            categoryId: category.id
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
            <ScrollView
                style={styles.background}
            >
                
                <View
                    style={{ flex:1,
                        flexDirection: "column",
                        alignItems:'center',
                        justifyContent:'center',
                        marginVertical: "35%",
                    }}
                >

                    {
                        oneExpense.name && 
                        <Text
                            style={{ 
                                fontSize: 45,
                                letterSpacing: 5,
                                color: styles.buttonTextColor.color
                            }}
                        > { oneExpense.name } </Text>
                    }
                    
                    {
                        category.name &&
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
                        (oneExpense.amount > 0) &&
                        <Text
                            style={{ 
                                fontSize: 30,
                                marginTop: 30,
                                color: styles.buttonTextColor.color
                            }}
                        > 
                        Money out: { oneExpense.amount } 
                        </Text>
                    }

                    {    
                        !oneExpense.amount && <Text></Text>
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
                        > Edit Category </Button>
                    
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
                        > Delete Category </Button>
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

