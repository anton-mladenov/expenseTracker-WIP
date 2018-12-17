import React, { Component } from "react"
import { ScrollView, Text, StyleSheet, View, BackHandler, FlatList } from "react-native"
import { connect } from "react-redux"
import { getOneCategory, deleteOneCategory, updateOneCategory, getAllCategories } from "../../actions/categoriesActions"
import { getAllExpenses } from "../../actions/expensesActions"
import CategoriesForm from "./CategoriesForm"
import ExpensesForm from "../expenses/ExpensesForm"
import Expenses from "../expenses/Expenses"
import { createNewExpense } from "../../actions/expensesActions"
import AllExpenses from "../expenses/AllExpenses"
import { Button, FAB, Card, Title, Divider } from 'react-native-paper';
import { addAndroidBackListener, removeAndroidBackListener } from "../AndroidBackButton"


class CategoryDetails extends Component {

    state = {
        toggleEdit: false,
        showExpenseForm: false,
        buttonsShow: true
    }

    componentDidMount() {
        addAndroidBackListener(this.goBack)
        const { navigation, oneCategory } = this.props
        const itemId = navigation.getParam('categoryId', 'NO-ID')
        this.props.getOneCategory(itemId)
        this.props.getAllExpenses(itemId) 
    }

    componentWillUnmount() {
        removeAndroidBackListener(this.goBack)
    }

    goBack = async () => {
        await this.props.navigation.push("AllCategories")
    }
    
    toggleEdit = () => {
        this.setState({
            toggleEdit: !this.state.toggleEdit
        })
    }
    
    editCategory = (data) => {
        const { navigation, oneCategory } = this.props
        const itemId = navigation.getParam('categoryId', 'NO-ID')
        this.props.updateOneCategory(itemId, data.name, oneCategory.color)
        this.props.navigation.push("AllCategories")
    }

    showAddExpenseForm = () => {
        this.setState({
            showExpenseForm: !this.state.showExpenseForm,
            buttonsShow: !this.state.buttonsShow
        })
    }

    handleDelete = () => {
        const { navigation } = this.props
        const itemId = navigation.getParam('categoryId', 'NO-ID')
        this.props.deleteOneCategory(itemId)
        this.props.navigation.push("AllCategories")
    }

    handleSubmit = (data) => {
        this.setState({
            buttonsShow: !this.state.buttonsShow,
            showExpenseForm: !this.state.showExpenseForm
        })
        const { navigation } = this.props
        const itemId = navigation.getParam('categoryId', 'NO-ID')
        const { name, amount } = data
        const fullData = {
            name,
            amount,
            categoryId: itemId
        }
        this.props.createNewExpense(fullData)
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
                    {
                        oneCategory && 
                        <Text
                            style={{ 
                                fontSize: 45,
                                letterSpacing: 5,
                                color: styles.buttonTextColor.color
                            }}
                        > 
                        { oneCategory.name } 
                        </Text>
                    }

                    {
                        oneCategory &&
                        <Text
                            style={{ 
                                fontSize: 30,
                                marginTop: 30,
                                color: styles.buttonTextColor.color
                            }}
                        > 
                        Money out: { oneCategory.amount } 
                        </Text>
                    }

                    {    
                        (oneCategory && oneCategory.amount === 0) &&
                        <Text
                            style={{ 
                                fontSize: 20,
                                marginTop: 30,
                                color: styles.buttonTextColor.color,
                                textAlign: "center"
                            }}
                        >
                        Time to add your first expense! 
                        </Text>
                    }
                    
                </View>

                {
                    this.state.buttonsShow &&
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
                }

                {
                    this.state.buttonsShow &&
                    <Button
                    mode="contained"
                    onPress={ this.toggleEdit }
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
                    mode="contained"
                    onPress={ this.showAddExpenseForm }
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
                    > Add New Expense </Button>
                }

                {
                    this.state.showExpenseForm &&
                    <ExpensesForm onSubmit={ this.handleSubmit } />
                }

                {
                    this.state.buttonsShow &&
                    <FlatList
                    data={ this.props.allExpenses }
                    keyExtractor={ (item, index) => item.id.toString() }
                    renderItem={ ({ item }) => 
                    <View>
                    <Card 
                        onPress={ () => this.props.navigation.push("ExpenseDetails", { expenseId: item.id, categoryId: oneCategory.id })}  
                        style={{ flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 80,
                            marginVertical: 5,
                            backgroundColor: styles.buttonBackground.backgroundColor
                        }} 
                    >
                        <Card.Content 
                            style={{ flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center', }} 
                        >
                            <Title 
                                style={{ color: styles.buttonTextColor.color }} 
                            > 
                                {item.name} 
                            </Title>
                        </Card.Content>
                    </Card>
                    </View>
                }
                />
                }

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        oneCategory: state.categories[0],
        allExpenses: state.expensesReducer
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

export default connect(mapStateToProps, { getOneCategory, deleteOneCategory, updateOneCategory, getAllCategories, createNewExpense, getAllExpenses })(CategoryDetails)





