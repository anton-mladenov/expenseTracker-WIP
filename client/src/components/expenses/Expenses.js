import React, { Component } from 'react'
import { ScrollView, Text, Button } from "react-native"
import { connect } from "react-redux"
import AllExpenses from "./AllExpenses"

class Expenses extends Component {

    state = {
        showCreateForm: false,
        showAllExpenses: false
    }

    showCreateForm = () => {
        this.setState({
            showCreateForm: !this.state.showCreateForm
        })
    }

    showAllExpenses = () => {
        this.setState({
            showAllExpenses: !this.state.showAllExpenses
        })
    }

    render() {

        const { category } = this.props

        return (
            <ScrollView>

                <AllExpenses categoryId={ category.id } />

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    category: state.categories,
})

export default connect(mapStateToProps, {})(Expenses)