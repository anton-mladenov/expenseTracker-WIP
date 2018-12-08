import React, { Component } from 'react'
import { ScrollView, Button, StyleSheet } from "react-native"
import { connect } from "react-redux"
import SignUpForm from "./SignUpForm"
import { newSignUp } from "../../actions/usersActions"
import { Title } from 'react-native-paper'

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
            <ScrollView style={styles.background}>
                {
                    !signUpSuccess &&
                    <Title 
                        style={{ color: styles.buttonTextColor.color, textAlign: "center", marginTop: 70, marginBottom: 30 }}
                    > 
                    Create A New Account
                    </Title>
                }

                {
                    !signUpSuccess &&
                    <SignUpForm onSubmit={ this.handleSubmit } />
                }

                {
                    signUpSuccess &&
                    <Text
                    style={{ color: styles.buttonTextColor.color, textAlign: "center", marginTop: 70, marginBottom: 30 }}
                    > 
                    Awesome! You have an account now. You now can log in. 
                    </Text>
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

export default connect(mapStateToProps, { newSignUp })(SignUp)