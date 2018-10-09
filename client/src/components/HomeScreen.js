import React, { Component } from 'react'
import { View, Text, Button } from "react-native"

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>

                <Text> HOME SCREEN </Text>
                <Text> </Text>

                <Button
                    title="EXPENSE CATEGORIES"
                    onPress={ () => this.props.navigation.navigate("Categories") }
                />
                <Text> </Text>

                <Button
                    title="SIGN UP"
                    onPress={ () => this.props.navigation.navigate("SignUp") }
                />
                <Text> </Text>

                <Button
                    title="SIGN IN"
                    onPress={ () => this.props.navigation.navigate("SignIn") }
                />
                <Text> </Text>

            </View>
        )
    }
}
