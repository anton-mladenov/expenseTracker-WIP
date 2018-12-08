import React, { Component } from 'react'
import { ScrollView, StyleSheet } from "react-native"
import { connect } from "react-redux"
import SignInForm from "./SignInForm"
import { newSignIn } from "../../actions/usersActions"
import { Title } from 'react-native-paper'

class SignIn extends Component {

    handleSubmit = (data) => {
        this.props.newSignIn(data)
        this.props.navigation.navigate("AllCategories")
    }

    render() {

        const { currentUser } = this.props

        return (
            <ScrollView style={styles.background}>

                {
                    !currentUser &&
                    <Title 
                        style={{ color: styles.buttonTextColor.color, textAlign: "center", marginTop: 70, marginBottom: 30 }} 
                    > 
                    Sign In To Your Account
                    </Title>
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

export default connect(mapStateToProps, { newSignIn })(SignIn)