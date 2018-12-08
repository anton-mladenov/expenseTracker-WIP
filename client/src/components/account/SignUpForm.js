import React, { Component } from 'react'
import { ScrollView, TextInput, StyleSheet } from "react-native"
import { Button } from 'react-native-paper'

export default class SignUpForm extends Component {

    state = {
        name: "",
        email: "",
        password: ""
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state)
        // this.props.navigation.navigate("Dashboard")
    }

    render() {
        return (
            <ScrollView style={styles.background}>

                <TextInput
                    placeholder="write your name here"
                    onChangeText={ (name) => this.setState({ name }) }
                    placeholderTextColor="white"
                    style={{ 
                        textAlign: "center",
                        color: "white",
                    }}
                />

                <TextInput
                    placeholder="whatever your email address is"
                    onChangeText={ (email) => this.setState({ email }) }
                    placeholderTextColor="white"
                    style={{ 
                        textAlign: "center",
                        color: "white",
                    }}
                />

                <TextInput
                    placeholder="type your password now"
                    secureTextEntry={true}
                    onChangeText={ (password) => this.setState({ password }) }
                    placeholderTextColor="white"
                    style={{ 
                        textAlign: "center",
                        color: "white",
                    }}
                />

                <Button
                    mode="contained"
                    onPress={ this.handleSubmit }
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
                > Sign Up </Button>

            </ScrollView>
        )
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