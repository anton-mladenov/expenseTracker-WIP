import React, { Component } from 'react'
import { ScrollView, Text, FlatList, View, StyleSheet } from "react-native"
import { connect } from "react-redux"
import { getAllExpenses } from "../../actions/expensesActions"
import ExpenseDetails from "./ExpenseDetails";
import { withNavigation } from "react-navigation"
import { Button, FAB, Card, Title, Divider } from 'react-native-paper';
import { addAndroidBackListener, removeAndroidBackListener } from "../AndroidBackButton"

class AllExpenses extends Component {

    state = {
        showAllExpenses: true,
        showExpenseDetails: false,
        expenseId: null,
        categoryId: null
    }

    componentDidMount() {
        const { categoryId } = this.props
        this.props.getAllExpenses(categoryId)
        addAndroidBackListener(this.goBack)
    }

    componentWillUnmount() {
        removeAndroidBackListener(this.goBack)
    }

    goBack = async () => {
        await this.props.navigation.goBack()
    }

    showExpenseDetails = (id) => {
        this.setState({
            showAllExpenses: !this.state.showAllExpenses,
            showExpenseDetails: !this.state.showExpenseDetails,
            expenseId: id,
            categoryId: this.props.category.id
        })
    }

    render() {

        const { allExpenses, currentUser } = this.props

        return (
            <ScrollView
                style={styles.background}
            >
                
                {
                    !allExpenses && <Text> Loading ... </Text>
                }

                {
                    allExpenses.length > 0 && 
                    <View style={{ flex:1,
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                        marginBottom: 10,
                        }} 
                    >
                        <Title style={{color: "white"}}> All Expenses </Title>
                    </View>
                }

                {
                    (this.state.showAllExpenses && currentUser) &&
                    <FlatList
                        data={ allExpenses }
                        keyExtractor={ (item, index) => item.id.toString() }
                        renderItem={ ({ item }) => 
                        <View>
                        <Card 
                            onPress={ () => this.props.navigation.navigate("ExpenseDetails", { expenseId: item.id })}  
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
        allExpenses: state.expensesReducer,
        category: state.categories[0],
        currentUser: state.currentUserReducer !== null,
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

const wrapNavigation = withNavigation(AllExpenses)

export default connect(mapStateToProps, { getAllExpenses })(wrapNavigation)