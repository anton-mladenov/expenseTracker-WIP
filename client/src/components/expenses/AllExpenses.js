import React, { Component } from 'react'
import { ScrollView, Text, Button, FlatList } from "react-native"
import { connect } from "react-redux"
import { getAllExpenses } from "../../actions/expensesActions"
import ExpenseDetails from "./ExpenseDetails";
import { withNavigation } from "react-navigation"

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
            <ScrollView>
                {
                    (this.state.showAllExpenses && currentUser) &&
                    <FlatList
                        data={ allExpenses }
                        keyExtractor={ (item, index) => item.id.toString() }
                        renderItem={ ({ item }) => <Button
                            title={ item.name }
                            onPress={ () => this.props.navigation.navigate("ExpenseDetails", {
                                expenseId: item.id
                            })
                                // this.showExpenseDetails(item.id) 
                            }
                        /> }
                    />
                }

                {/* {
                    this.state.showExpenseDetails &&
                    <ExpenseDetails expenseId={ this.state.expenseId } />
                } */}

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

const wrapNavigation = withNavigation(AllExpenses)

export default connect(mapStateToProps, { getAllExpenses })(wrapNavigation)