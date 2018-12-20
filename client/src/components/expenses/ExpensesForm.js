import React, { Component } from 'react'
import { ScrollView, TextInput, StyleSheet, View } from "react-native"
import { Button, Title } from 'react-native-paper';

export default class ExpensesForm extends Component {

    state = {
        name: "",
        amount: ""
    }

    componentDidMount() {
        const { name, amount } = this.props.initialValues
        console.log("initialValues: ", name, amount)
        this.setState({
            name,
            amount: amount.toString()
        })
        console.log("state: ", this.state)
    }

    handleNameChange = (name) => {
        this.setState({ 
            name
        });
    }
    handleAmountChange = (amount) => {
        this.setState({ 
            amount
        });
    }

    handleSubmit = () => {
        return this.props.onSubmit(this.state)
    }

    render() {

        // const initialValues = this.props.initialValues || {}
        // if (initialValues.amount !== undefined) {
        //     const amountString = initialValues.amount.toString()
        //     initialValues.amount = amountString
        // }
        // console.log("initialValues: ", initialValues)

        return (
            <ScrollView>
                
                <View 
                    style={{ flex:1,
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center',
                        marginBottom: 40
                    }} 
                    >
                    <TextInput
                        placeholder="so... what did you buy?"
                        onChangeText={ this.handleNameChange }
                        value={ this.state.name }
                        placeholderTextColor="white"
                        style={{ 
                            textAlign: "center",
                            color: "white",
                            marginBottom: 30,
                            marginTop: 15
                        }}
                    />

                    <TextInput
                        placeholder="...and how much does that cost?"
                        onChangeText={ this.handleAmountChange }
                        value={ this.state.amount }
                        placeholderTextColor="white"
                        style={{ 
                            textAlign: "center",
                            color: "white",
                            marginTop: 15,
                            marginBottom: 30,
                        }}
                    />

                    <Button
                        mode="contained"
                        onPress={ this.handleSubmit }
                        style={{ flex:1,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            marginHorizontal: 60,
                            marginVertical: 5,
                            backgroundColor: "#FF951C", 
                            color: styles.buttonTextColor.color,
                            borderBottomWidth: 0.3,
                            borderRightWidth: 0.3,
                            borderColor: "white"
                        }}
                    > Submit </Button>
                
                </View>

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