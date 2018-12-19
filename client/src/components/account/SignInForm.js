import React, { Component } from 'react'
import { ScrollView, TextInput, StyleSheet } from "react-native"
import { Button } from 'react-native-paper'

export default class SignInForm extends Component {

    state = {
        email: "",
        password: ""
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state)
    }

    render() {
        return (
            <ScrollView style={styles.background}>
                <TextInput
                    placeholder="your email ..."
                    onChangeText={ (email) => this.setState({ email }) }
                    placeholderTextColor="white"
                    style={{ 
                        textAlign: "center",
                        color: "white",
                        lineHeight: 45
                    }}
                />

                <TextInput
                    placeholder="... and your password, please"
                    secureTextEntry={true}
                    onChangeText={ (password) => this.setState({ password }) }
                    placeholderTextColor="white"
                    style={{ 
                        textAlign: "center",
                        color: "white",
                        lineHeight: 45
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
                > Log In </Button>

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