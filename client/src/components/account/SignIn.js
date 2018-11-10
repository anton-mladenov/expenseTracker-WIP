import React, { Component } from 'react'
import { ScrollView, Text, Button } from "react-native"
import { connect } from "react-redux"
import SignInForm from "./SignInForm"
import { newSignIn } from "../../actions/usersActions"
import Dashboard from "../Dashboard"

class SignIn extends Component {

    handleSubmit = (data) => {
        this.props.newSignIn(data)
        this.props.navigation.navigate("AllCategories")
    }

    render() {

        const { currentUser } = this.props

        return (
            <ScrollView>

                {
                    !currentUser &&
                    <Text> Sign in to your account first. </Text>
                }

                {
                    !currentUser &&
                    <SignInForm onSubmit={ this.handleSubmit } />
                }

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUserReducer !== null,
    }
}

export default connect(mapStateToProps, { newSignIn })(SignIn)