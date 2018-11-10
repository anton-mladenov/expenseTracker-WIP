import React, { Component } from 'react'
import { ScrollView, Text, Button } from "react-native"
import { connect } from "react-redux"
import SignUpForm from "./SignUpForm"
import { newSignUp } from "../../actions/usersActions"
import Dashboard from "../Dashboard"

class SignUp extends Component {

    state = {
        showDashboard: false
    }

    handleSubmit = (data) => {
        this.props.newSignUp(data)
    }

    render() {

        const { signUpSuccess } = this.props

        return (
            <ScrollView>
                {
                    !signUpSuccess &&
                    <Text> Create Your Account </Text>
                }

                {
                    !signUpSuccess &&
                    <SignUpForm onSubmit={ this.handleSubmit } />
                }

                {
                    signUpSuccess &&
                    <Text> Awesome! You have an account now. You now can log in. </Text>
                }

                {
                    signUpSuccess &&
                    <Button
                        title="Go To Login Page"
                        onPress={ () => this.props.navigation.navigate("WelcomeScreen") }
                    />
                }

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signUpSuccess: state.signUpReducer.success === true
    }
}

export default connect(mapStateToProps, { newSignUp })(SignUp)