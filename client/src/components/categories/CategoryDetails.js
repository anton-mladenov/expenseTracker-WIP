import React, { Component } from "react"
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import { getOneCategory, deleteOneCategory, updateOneCategory, getAllCategories } from "../../actions/categoriesActions"
import CategoriesForm from "./CategoriesForm"
import Expenses from "../expenses/Expenses"

class CategoryDetails extends Component {

    state = {
        toggleEdit: false,
        showExpenseForm: false,
    }

    componentDidMount() {
        this.props.getOneCategory(this.props.categoryId)
        this.props.getAllCategories()
    }

    toggleEdit = () => {
        this.setState({
            toggleEdit: !this.state.toggleEdit
        })
    }

    editCategory = (data) => {
        this.props.updateOneCategory(this.props.categoryId, data.name)
    }

    showAddExpenseForm = () => {
        this.setState({
            showExpenseForm: !this.state.showExpenseForm
        })
    }

    render() {

        const { oneCategory } = this.props
        console.log("CATEGORY ID: ", oneCategory.id, oneCategory)

        return (
            <View>

                <Text> { oneCategory.name } </Text>
                <Text> { oneCategory.amount } </Text>

                <Button
                    title="Delete This Category"
                    onPress={ () => this.props.deleteOneCategory(this.props.categoryId) }
                />

                <Button
                    title="Edit This Category"
                    onPress={ this.toggleEdit }
                />

                {
                    this.state.toggleEdit &&
                    <CategoriesForm
                        initialValues={ oneCategory }
                        onSubmit={ this.editCategory }
                    />
                }

                {
                    <Button
                        title="Add A New Expense To This Category"
                        onPress={ this.showAddExpenseForm }
                    />
                }

                {
                    this.state.showExpenseForm &&
                    <Expenses categoryId={ this.props.categoryId } />
                }

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        oneCategory: state.categories
    }
}

export default connect(mapStateToProps, { getOneCategory, deleteOneCategory, updateOneCategory, getAllCategories })(CategoryDetails)





