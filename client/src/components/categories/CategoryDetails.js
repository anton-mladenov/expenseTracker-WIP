import React, { Component } from "react"
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import { getOneCategory } from "../../actions/categoriesActions"

class CategoryDetails extends Component {

    id = this.props.categoryId

    componentDidMount() {
        console.log(" TESTING FROM Category Details component ..... ", this.props.categoryId)
        this.props.getOneCategory(this.props.categoryId)
    }

    render() {

        const { oneCategory } = this.props
        // console.log(" TESTING FROM Category Details component ..... ", this.props.categoryId)
        return (
            <View>

                {
                    oneCategory &&
                    <Text> { oneCategory.name } { oneCategory.amount } </Text>
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

export default connect(mapStateToProps, { getOneCategory })(CategoryDetails)