import React, { Component } from 'react'
import { View, Text, Button, FlatList } from "react-native"
import { connect } from "react-redux"
import { getAllExpenses } from "../../actions/expensesActions"
import ExpenseDetails from "./ExpenseDetails"

class AllExpenses extends Component {

    state = {
        showAllExpenses: true,
        showExpenseDetails: false,
        expenseId: null,
        categoryId: null
    }

    componentDidMount() {
        this.props.getAllExpenses(this.props.categoryId)
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

        const { allExpenses } = this.props

        return (
            <View>
                {
                    this.state.showAllExpenses &&
                    <FlatList
                        data={ allExpenses }
                        renderItem={ ({ item }) => <Button
                            title={ item.name }
                            onPress={ () => this.showExpenseDetails(item.id) }
                            keyExtractor={ (item, index) => item.key }
                        /> }
                    />
                }

                {
                    this.state.showExpenseDetails &&
                    <ExpenseDetails expenseId={ this.state.expenseId } />
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allExpenses: state.expensesReducer,
        category: state.categories[0]
    }
}

export default connect(mapStateToProps, { getAllExpenses })(AllExpenses)