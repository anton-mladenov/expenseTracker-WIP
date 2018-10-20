import React, { Component } from 'react'
import { View, Text, Button, FlatList } from "react-native"
import { connect } from "react-redux"
import { getAllCategories, createNewCategory } from "../../actions/categoriesActions"
import CategoryDetails from "./CategoryDetails"
import CategoriesForm from "./CategoriesForm"


class AllCategories extends Component {

    state = {
        showFlatList: true,
        showDetails: false,
        categoryId: null,
        showAddButton: true,
        showForm: false
    }

    componentDidMount() {
        const { currentUser, navigation } = this.props
        !currentUser && navigation.navigate("WelcomeScreen")
        currentUser && this.props.getAllCategories()
    }

    showCategoryDetails = (id) => {
        const idInt = parseInt(id, 10)
        return this.setState({
            categoryId: idInt,
            showDetails: !this.state.showDetails,
            showFlatList: !this.state.showFlatList,
        })
    }

    showAddForm = () => {
        this.setState({
            showForm: !this.state.showForm,
            showAddButton: !this.state.showAddButton,
            showFlatList: !this.state.showFlatList
        })
    }

    handleSubmit = (data) => {
        this.props.createNewCategory(data.name)
    }

    render() {

        const { allCategories, navigation, currentUser } = this.props
        const { navigate } = this.props.navigation
        const id = this.state.categoryId

        return (
            <View>

                {
                    !currentUser && <Text> Loading ... </Text>
                }

                {
                    (this.state.showAddButton && currentUser) &&
                    <Button
                        title="Add A New Category"
                        onPress={ this.showAddForm }
                    />
                }

                {
                    this.state.showForm &&
                    <CategoriesForm onSubmit={ this.handleSubmit } />
                }

                <Text> </Text>

                {
                    (this.state.showFlatList && currentUser) &&
                    <FlatList
                        data={ allCategories }
                        keyExtractor={ (item, index) => item.id.toString() }
                        renderItem={ ({ item }) => <Button
                            title={ item.name }
                            onPress={ () => navigate("CategoryDetails", {
                                categoryId: item.id
                            })
                            }
                        /> }
                    />
                }

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    allCategories: state.categories,
    currentUser: state.currentUserReducer !== null,
})

export default connect(mapStateToProps, { getAllCategories, createNewCategory })(AllCategories)

