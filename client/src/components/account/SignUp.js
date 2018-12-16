import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from "react-native"
import { connect } from "react-redux"
import SignUpForm from "./SignUpForm"
import { newSignUp } from "../../actions/usersActions"
import { Title, Button, Text } from 'react-native-paper'

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
                    <View>
                        <Text
                        style={{ color: styles.buttonTextColor.color, textAlign: "center", marginTop: 70, marginBottom: 30 }}
                        > 
                        Awesome! You have an account now. 
                        </Text>
                        <Text
                        style={{ color: styles.buttonTextColor.color, textAlign: "center", marginBottom: 30 }}
                        > 
                        You now can log in. 
                        </Text>
                    </View>
                }

                {
                    signUpSuccess &&
                    <Button
                    mode="contained"
                    onPress={ () => this.props.navigation.navigate("WelcomeScreen") }
                    style={{ 
                        flex:1,
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                        marginHorizontal: 60,
                        marginVertical: 40,
                        backgroundColor: "#FF951C", 
                        color: styles.buttonTextColor.color,
                        borderBottomWidth: 0.3,
                        borderRightWidth: 0.3,
                        borderColor: "white",
                    }}
                > Go To Login Page </Button>
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