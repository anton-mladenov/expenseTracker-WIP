import React, { Component } from 'react'
import { View, Text, Button, FlatList } from "react-native"
import { connect } from "react-redux"
import { getAllCategories } from "../../actions/categoriesActions"

class AllCategories extends Component {

    componentDidMount() {
        this.props.getAllCategories()
    }

    doNothing = () => {
        return "hahaha"
    }

    render() {

        const { allCategories } = this.props

        return (
            <View>

                <FlatList
                    data={ allCategories }
                    // renderItem={ ({ item }) => <Text> { item.name } </Text> }
                    renderItem={ ({ item }) => <Button title={ item.name } onPress={ this.doNothing } /> }
                />

                {/* {
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
                } */}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    allCategories: state.categories
})

export default connect(mapStateToProps, { getAllCategories })(AllCategories)