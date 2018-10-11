import React, { Component } from "react"
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import { getOneCategory, deleteOneCategory, updateOneCategory } from "../../actions/categoriesActions"
import CategoriesForm from "./CategoriesForm"

class CategoryDetails extends Component {

    state = {
        toggleEdit: false
    }

    componentDidMount() {
        console.log(" componentDidMount id: ", this.props.categoryId)
        this.props.getOneCategory(this.props.categoryId)
    }

    toggleEdit = () => {
        this.setState({
            toggleEdit: !this.state.toggleEdit
        })
    }

    editCategory = (data) => {
        console.log(" JUST A TEST From  from UPDATE!: ", this.props.categoryId, this.props.oneCategory.name, this.props.oneCategory)
        this.props.updateOneCategory(this.props.categoryId, data.name)
    }

    render() {

        const { oneCategory } = this.props

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

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        oneCategory: state.categories
        // .find((category) => {
        //     parseInt(category.id, 10) === this.state.categoryId
        // })
    }
}

export default connect(mapStateToProps, { getOneCategory, deleteOneCategory, updateOneCategory })(CategoryDetails)