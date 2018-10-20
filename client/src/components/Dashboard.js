import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import Categories from "./categories/Categories"
import ExpensesForm from "./expenses/ExpensesForm"

class Dashboard extends Component {

    render() {

        const { currentUser, signUpSuccess } = this.props

        return (
            <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>

                <Text> Dashboard </Text>
                {
                    currentUser &&
                    <Categories />
                }

                {
                    !currentUser &&
                    <Text> You have to be logged in to see this screen. </Text>
                }

                {
                    !currentUser &&
                    <Button
                        title="Go Back To Login Form"
                        onPress={ () => this.props.navigation.navigate("WelcomeScreen") }
                    />
                }

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUserReducer !== null,
        signUpSuccess: state.signUpReducer.success === true
    }
}

export default connect(mapStateToProps, {})(Dashboard)
