import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import AllCategories from "./categories/AllCategories"

class HomeScreen extends Component {


    render() {

        const { currentUser, signUpSuccess } = this.props

        return (
            <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>

                <Text> HOME SCREEN </Text>
                <Text> </Text>

                {
                    // (currentUser || signUpSuccess) &&
                    <Button
                        title="EXPENSE CATEGORIES"
                        onPress={ () => this.props.navigation.navigate("Categories") }
                    />
                    // <AllCategories />
                }

                {/* <AllCategories /> */ }

                {
                    (!currentUser || !signUpSuccess) &&

                    <Button
                        title="SIGN UP"
                        onPress={ () => this.props.navigation.navigate("SignUp") }
                    />
                }
                <Text> </Text>
                {
                    (!currentUser || !signUpSuccess) &&
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

export default connect(mapStateToProps, {})(HomeScreen)