import React, { Component } from 'react'
import { connect } from "react-redux"
import { View, Button, TextInput } from "react-native"
import { withNavigation } from "react-navigation"
import { getAllCategories } from "../actions/categoriesActions"
import { getAllExpenses } from "../actions/expensesActions"
import { Appbar } from 'react-native-paper';

class MyComponent extends React.Component {
  _goBack = () => console.log('Went back');

  _onSearch = () => console.log('Searching');

  _onMore = () => console.log('Shown more');

  render() {
    return (
      <Appbar.Header>
        <Appbar.BackAction
          onPress={this._goBack}
        />
      </Appbar.Header>
    );
  }
}


class BackButton extends Component {

    _goBack = () => {
        const { category, categoryId } = this.props
        const catId = parseInt(categoryId, 10)
        category === "AllCategories" ? this.props.getAllCategories() : console.log("looking for expenses, not categories")
        category === "AllExpenses" ? this.props.getAllExpenses(catId) : console.log("looking for categories, not expenses")
        this.props.navigation.goBack()
    }

    render() {

        
        return (
            <View>
                <Appbar.Header
                style={{backgroundColor: "black"}}>
                    <Appbar.BackAction
                    onPress={this._goBack}
                    />
                </Appbar.Header>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categoryId: state.categories[0].id
    }
}

const wrapNavigation = withNavigation(BackButton)

export default connect(mapStateToProps, { getAllCategories, getAllExpenses })(wrapNavigation)