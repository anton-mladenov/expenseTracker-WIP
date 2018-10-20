
import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation"
import SignUp from "./src/components/account/SignUp"
import SignIn from "./src/components/account/SignIn"
import WelcomeScreen from "./src/components/WelcomeScreen"
import Dashboard from "./src/components/Dashboard"
import AllCategories from "./src/components/categories/AllCategories"
import CategoryDetails from "./src/components/categories/CategoryDetails"
import SignInForm from "./src/components/account/SignInForm"
import SignUpForm from "./src/components/account/SignUpForm"
import CategoryForm from "./src/components/categories/CategoriesForm"
import AllExpenses from "./src/components/expenses/AllExpenses"
import ExpenseDetails from "./src/components/expenses/ExpenseDetails"
import Expenses from "./src/components/expenses/Expenses"
import ExpensesForm from "./src/components/expenses/ExpensesForm"
import Categories from "./src/components/categories/Categories"
import { setJWT, signInSuccess } from "./src/actions/usersActions"
import { getJWT, getStorageFunc, storageKey } from "./src/lib/lib"
import { connect } from "react-redux"


const RootStack = createStackNavigator(
    {
        SignIn: SignIn,
        SignUp: SignUp,
        WelcomeScreen: WelcomeScreen,
        Dashboard: Dashboard,
        AllCategories: AllCategories,
        CategoryDetails: CategoryDetails,
        SignInForm: SignInForm,
        SignUpForm: SignUpForm,
        CategoryForm: CategoryForm,
        AllExpenses: AllExpenses,
        ExpenseDetails: ExpenseDetails,
        Expenses: Expenses,
        ExpensesForm: ExpensesForm,
        Categories: Categories
    },
    {
        initialRouteName: "WelcomeScreen",
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            // headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
)

class App extends Component {

    componentDidMount = async () => { // this code here gets the token from AsyncStorage if there's one and helps the user to log in faster
        getStorageFunc(storageKey).then(obj => {
            this.props.setJWT(obj)
        })
    }

    render() {
        return (
            <RootStack />
        )
    }
}

export default connect(null, { setJWT, signInSuccess, getStorageFunc })(App)