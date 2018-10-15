import React, { Component } from 'react'
import { View, Text, Button, FlatList } from "react-native"
import { connect } from "react-redux"
import { getAllCategories } from "../../actions/categoriesActions"
import CategoryDetails from "./CategoryDetails"

class AllCategories extends Component {

    state = {
        showFlatList: true,
        showDetails: false,
        categoryId: null
    }

    componentDidMount() {
        this.props.getAllCategories()
    }

    showCategoryDetails = (id) => {
        const idInt = parseInt(id, 10)
        return this.setState({
            categoryId: idInt,
            showDetails: !this.state.showDetails,
            showFlatList: !this.state.showFlatList,
        })
    }

    render() {

        const { allCategories } = this.props
        const id = this.state.categoryId

        return (
            <View>

                {
                    this.state.showFlatList &&
                    <FlatList
                        data={ allCategories }
                        keyExtractor={ (item, index) => item.id }
                        renderItem={ ({ item }) => <Button
                            title={ item.name }
                            onPress={ () => this.showCategoryDetails(item.id) }
                        /> }
                    />
                }

                {
                    this.state.showDetails &&
                    <CategoryDetails categoryId={ this.state.categoryId } />
                }

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    allCategories: state.categories
})

export default connect(mapStateToProps, { getAllCategories })(AllCategories)

