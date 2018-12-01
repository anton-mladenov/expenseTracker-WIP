import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet, View } from "react-native"
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
            <ScrollView
                style={styles.background}
            >

                <View
                    style={{ 
                        flex:1,
                        flexDirection: "column",
                        alignItems:'center',
                        justifyContent:'center',
                        marginVertical: "30%",
                        }}
                >
                    <Text
                        style={{ 
                            fontSize: 30,
                            letterSpacing: 5,
                            color: styles.buttonTextColor.color
                        }}
                    > MoneyOut </Text>

                    <Text
                        style={{ 
                            fontSize: 15,
                            letterSpacing: 5,
                            lineHeight: 30,
                            color: styles.buttonTextColor.color,
                            marginVertical: "10%",
                            textAlign: 'center',
                        }}
                    > Opens your third eye for money management </Text>
                </View>

                {
                    !currentUser &&
                    <Button
                    mode="contained"
                    onPress={ () => this.props.navigation.navigate("SignUp") }
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
                        borderColor: "white",
                        marginBottom: 30,
                    }}
                    > Sign Up </Button>
                }

                {
                    !currentUser &&
                    <Button
                    mode="contained"
                    onPress={ () => this.props.navigation.navigate("SignIn") }
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
                    > Sign In </Button>
                }

                {
                    currentUser &&
                    <Button
                    mode="contained"
                    onPress={ () => this.props.navigation.navigate("AllCategories") }
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
                    > Go To Your Categories </Button>
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

export default connect(mapStateToProps, {})(WelcomeScreen)