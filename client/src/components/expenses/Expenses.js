import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
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
        return (
            <View>

                <Button
                    title="See All Expenses"
                    onPress={ this.showAllExpenses }
                />

                {
                    this.state.showAllExpenses &&
                    <AllExpenses />
                }


            </View>
        )
    }
}

export default connect(null, {})(Expenses)