
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
import BackButton from "./src/components/BackButton"
import { setJWT, signInSuccess } from "./src/actions/usersActions"
import { getAllCategories } from "./src/actions/categoriesActions"
import { getJWT, getStorageFunc, storageKey } from "./src/lib/lib"
import { connect } from "react-redux"
import { Button, Image, View } from "react-native"
import { Appbar } from "react-native-paper"

const RootStack = createStackNavigator(
    {
        SignIn: {
            screen: SignIn,
            navigationOptions: {
                headerLeft: null,
            }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                headerLeft: null,
            }
        },
        WelcomeScreen: {
            screen: WelcomeScreen,
            navigationOptions: {
                headerLeft: null,
            }
        },
        Dashboard: {
            screen: Dashboard,
            navigationOptions: {
                headerLeft: null,
            }
        },
        AllCategories: {
            screen: AllCategories,
            navigationOptions: {
                
            }
        },
        CategoryDetails: {
            screen: CategoryDetails,
            navigationOptions: () => ({
                headerLeft:
                    () => <BackButton category={"AllCategories"} />,
            })
        },
        SignInForm: {
            screen: SignInForm,
            navigationOptions: {
                headerLeft: null,
            }
        },
        SignUpForm: {
            screen: SignUpForm,
            navigationOptions: {
                headerLeft: null,
            }
        },
        CategoryForm: {
            screen: CategoryForm,
            navigationOptions: () => ({
                headerLeft:
                    () => console.log(" WHHHHHHHHAAAAAATTTT???? ______________________________"),
            })
        },
        AllExpenses: {
            screen: AllExpenses,
            navigationOptions: {
                headerLeft: null,
            }
        },
        ExpenseDetails: {
            screen: ExpenseDetails,
            navigationOptions: () => ({
                headerLeft:
                    () => <BackButton category={"AllExpenses"} />,
            })
        },
        Expenses: {
            screen: Expenses,
            navigationOptions: {
                headerLeft: null,
            }
        },
        ExpensesForm: {
            screen: ExpensesForm,
            navigationOptions: {
                headerLeft: null,
            }
        },
        Categories: {
            screen: Categories,
            navigationOptions: {
                headerLeft: null,
            }
        },
    },
    {
        initialRouteName: "WelcomeScreen",
        navigationOptions: {
            headerStyle: {
              backgroundColor: '#FF951C',
            },
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            //   color: "white"
            // },
          },
    }
)

class App extends Component {

    // this code here gets the token from AsyncStorage if there's one and helps the user to log in faster
    componentDidMount = async () => { 
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

export default connect(null, { setJWT, signInSuccess, getStorageFunc, getAllCategories })(App)