import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import { getAllCategories } from "../../actions/categoriesActions"

class AllCategories extends Component {

    componentDidMount() {
        this.props.getAllCategories()
    }

    render() {

        const { allCategories } = this.props

        return (
            <View>
                {
                    allCategories.map((category) => {
                        // console.log("Success from inside the function!")
                        // return 
                        return (
                            <View key={ category.id }>
                                <Text> { category.name } </Text>
                                <Text> { category.amount ? category.amount : null } </Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    allCategories: state.categories
})

export default connect(mapStateToProps, { getAllCategories })(AllCategories)