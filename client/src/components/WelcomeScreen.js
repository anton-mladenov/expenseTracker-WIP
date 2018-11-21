import React, { Component } from 'react'
import { ScrollView, Text } from "react-native"
import { connect } from "react-redux"
import { AsyncStorage } from "react-native"
import { Button, Title } from 'react-native-paper';


class WelcomeScreen extends Component {

    componentDidUpdate() {
        const { currentUser, navigation } = this.props
        currentUser && navigation.navigate("AllCategories")
    }

    render() {

        const { currentUser, signUpSuccess } = this.props

        return (
            <ScrollView>

                <Text
                    style={{ fontWeight: "bold", fontSize: 30, paddingHorizontal: 100, paddingVertical: 20}}
                > MoneyOut </Text>
                <Text
                    style={{ fontWeight: "bold", fontSize: 15, paddingHorizontal: 20, marginBottom: 30 }}
                > Opens your third eye for money management </Text>

                {
                    !currentUser &&
                    <Button
                        color="purple"
                        mode="contained"
                        onPress={ () => this.props.navigation.navigate("SignUp") }
                        style={{ flex:1,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center' }}
                    >
                    Sign Up
                    </Button>
                }

                <Text> </Text>
                {
                    !currentUser &&
                    <Button
                        color="green"
                        mode="contained"
                        onPress={ () => this.props.navigation.navigate("SignIn") }
                        style={{ flex:1,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center' }}
                    >
                    Sign In
                    </Button>
                }

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUserReducer !== null,
        signUpSuccess: state.signUpReducer.success === true
    }
}

export default connect(mapStateToProps, {})(WelcomeScreen)