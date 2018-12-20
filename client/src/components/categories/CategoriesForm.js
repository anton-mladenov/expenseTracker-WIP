import React, { Component } from 'react'
import { ScrollView, TextInput, StyleSheet, View, FormLabel } from "react-native"
import { Button } from 'react-native-paper'
import { withNavigation } from "react-navigation"
import { connect } from "react-redux"
import { createNewCategory, getAllCategories } from "../../actions/categoriesActions"
import { addAndroidBackListener, removeAndroidBackListener } from "../AndroidBackButton"


class CategoriesForm extends Component {

    state = {
        name: "",
    }

    componentDidMount() {
        addAndroidBackListener(this.goBack)
        const oneCategory = this.props.initialValues
        if (oneCategory !== undefined) {
            this.setState({
                name: oneCategory.name
            })
        }
    }

    componentWillUnmount() {
        removeAndroidBackListener(this.goBack)
    }

    goBack = async () => {
        await this.props.navigation.push("AllCategories")
    }

    handleNameChange = (name) => {
        this.setState({ 
            name
        });
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state)
    }

    render() {

        return (
            <ScrollView
                style={styles.background}
            >
                
                <View 
                    style={{ flex:1,
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop: 50,
                    }}>

                    <TextInput
                        placeholder="Give A Name To Your New Category."
                        onChangeText={ this.handleNameChange }
                        value={ this.state.name }
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

const categoriesFormWithNav = withNavigation(CategoriesForm) 

export default connect(null, { createNewCategory, getAllCategories })(categoriesFormWithNav)