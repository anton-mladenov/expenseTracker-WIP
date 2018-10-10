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
        console.log("state cat id: ", this.state.categoryId, this.state.showDetails, { idInt })
        return this.setState({
            showDetails: !this.state.showDetails,
            showFlatList: !this.state.showFlatList,
            categoryId: idInt,
        })
    }

    render() {

        const { allCategories } = this.props
        console.log("state cat id: ", this.state.categoryId, this.state.showDetails)

        return (
            <View>

                {
                    this.state.showFlatList &&
                    <FlatList
                        data={ allCategories }
                        renderItem={ ({ item }) => <Button title={ item.name } onPress={ () => this.showCategoryDetails(item.id) } /> }
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