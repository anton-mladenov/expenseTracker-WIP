import React, { Component } from 'react'
import { ScrollView, Text, Button } from "react-native"
import { connect } from "react-redux"
import CategoriesForm from "./CategoriesForm"
import { createNewCategory } from "../../actions/categoriesActions"
import AllCategories from "./AllCategories"

class Categories extends Component {

    state = {
        showAddButton: true,
        showAllButton: true,
        showForm: false,
        showAllCategories: false,
    }

    componentDidMount() {
        const { currentUser, navigation } = this.props
        !currentUser && navigation.navigate("WelcomeScreen")
    }

    showAllForm = () => {
        this.setState({
            showAddButton: !this.state.showAddButton,
            showAllButton: !this.state.showAllButton,
            showAllCategories: !this.state.showAllCategories
        })
    }

    render() {

        const { currentUser, navigation } = this.props

        return (
            <ScrollView>

                {
                    (this.state.showAllButton && currentUser) &&
                    <Button
                        title="All Categories"
                        onPress={ () => navigation.navigate('AllCategories') }
                    />
                }

                <Text> { } </Text>
                {
                    this.state.showAllCategories &&
                    <AllCategories />
                }

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUserReducer !== null,
    }
}

export default connect(mapStateToProps, { createNewCategory })(Categories)