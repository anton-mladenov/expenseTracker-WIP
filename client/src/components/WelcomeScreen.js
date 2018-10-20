import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import { AsyncStorage } from "react-native"


class WelcomeScreen extends Component {


    componentDidUpdate() {
        const { currentUser, navigation } = this.props
        currentUser && navigation.navigate("AllCategories")
    }

    render() {

        const { currentUser, signUpSuccess } = this.props

        return (
            <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>

                <Text> Welcome to </Text>
                <Text> MoneyOut </Text>
                <Text> Open your third eye for money management </Text>

                {
                    !currentUser &&
                    <Button
                        title="SIGN UP"
                        onPress={ () => this.props.navigation.navigate("SignUp") }
                    />
                }

                <Text> </Text>
                {
                    !currentUser &&
                    <Button
                        title="SIGN IN"
                        onPress={ () => this.props.navigation.navigate("SignIn") }
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

export default connect(mapStateToProps, {})(WelcomeScreen)