import React, { Component } from 'react'
import { View, Text, Button, FlatList } from "react-native"
import { connect } from "react-redux"
import { getAllExpenses } from "../../actions/expensesActions"

class AllExpenses extends Component {

    state = {
        showAllExpenses: true,

    }

    componentDidMount() {
        this.props.getAllExpenses()
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
                            onPress={ () => console.log("Nothing!") }
                            keyExtractor={ (item, index) => item.key }
                        /> }
                    />
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allExpenses: state.expensesReducer
    }
}

export default connect(mapStateToProps, { getAllExpenses })(AllExpenses)