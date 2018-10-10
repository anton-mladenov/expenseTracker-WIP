import React, { Component } from "react"
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import { getOneCategory, deleteOneCategory } from "../../actions/categoriesActions"

class CategoryDetails extends Component {

    componentDidMount() {
        this.props.getOneCategory(this.props.categoryId)
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

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        oneCategory: state.categories
    }
}

export default connect(mapStateToProps, { getOneCategory, deleteOneCategory })(CategoryDetails)