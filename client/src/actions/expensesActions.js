
import { baseUrl, jwtDecodeToExpDate } from "../lib/lib"
import axios from "axios"
import { logout } from "./usersActions"
import { stringToInt } from "../lib/lib"


// GET ONE EXPENSE

export const GET_ONE_EXPENSE = "GET_ONE_EXPENSE"

const getExpense = (data) => ({
    type: GET_ONE_EXPENSE,
    payload: data
})

export const getOneExpense = (data) => (dispatch, getState) => {

    // const state = getState()
    // if (!state.currentUserReducer) return logout()

    // const jwt = state.currentUserReducer.jwt
    // if (jwtDecodeToExpDate(jwt)) return logout()

    axios({
        url: baseUrl,
        method: "post",
        data: {
            query: `
            query { 
                expense(id: ${data.id}, categoryId: ${data.categoryId}){
                    id
                    name
                        amount
                    category {
                        name
                        amount
                    }
                    user {
                        id
                        name
                    }
                }
            }
            `
        }
    }).then((result) => {
        dispatch(getExpense(result.data.data.expense))
    }).catch((error) => {
        console.log("There was an error when getting the new expense " + error)
        return "There was an error when getting the new expense " + error
    })
}


// GET ALL EXPENSES

export const GET_ALL_EXPENSES = "GET_ALL_EXPENSES"

const getExpenses = (data) => ({
    type: GET_ALL_EXPENSES,
    payload: data
})

export const getAllExpenses = () => (dispatch, getState) => {

    // const state = getState()
    // if (!state.currentUserReducer) return logout()

    // const jwt = state.currentUserReducer.jwt
    // if (jwtDecodeToExpDate(jwt)) return logout()

    axios({
        url: baseUrl,
        method: "post",
        data: {
            query: `
            query {
                allExpenses {
                    id
                    name
                    amount
                    category {
                        name
                        amount
                    }
                    user {
                        id
                        name
                    }
                }
            }
            `
        }
    }).then((result) => {
        console.log("result.data", result.data.data.allExpenses)
        const intResults = stringToInt(result.data.data.allExpenses)
        dispatch(getExpenses(intResults))
    }).catch((error) => {
        console.log("There was an error when getting all expenses " + error)
        return "There was an error when getting all expenses " + error
    })
}


// CREATE NEW EXPENSE 

export const CREATE_ONE_EXPENSE = "CREATE_ONE_EXPENSE"

const createExpense = (data) => ({
    type: CREATE_ONE_EXPENSE,
    payload: data
})

export const createNewExpense = (data) => (dispatch, getState) => {

    console.log(" from action creators - data: ", data)

    // const state = getState()
    // if (!state.currentUserReducer) return logout()

    // const jwt = state.currentUserReducer.jwt
    // if (jwtDecodeToExpDate(jwt)) return logout()

    axios({
        url: baseUrl,
        method: "post",
        data: {
            query: `
            mutation {
                createExpense(name: "${data.name}", amount: ${data.amount}, categoryId: ${data.categoryId}) {
                    id
                    name
                    amount
                }
              }
            `
        }
    }).then((result) => {
        console.log("result.data", result.data.data.createExpense)
        dispatch(createExpense(result.data.data.createExpense))
    }).catch((error) => {
        console.log("There was an error when creating the new expense " + error)
        return "There was an error when creating the new expense " + error
    })
}


// EDIT ONE EXPENSE

export const EDIT_ONE_EXPENSE = "EDIT_ONE_EXPENSE"

const editExpense = (data) => ({
    type: EDIT_ONE_EXPENSE,
    payload: data
})



// DELETE ONE EXPENSE

export const DELETE_ONE_EXPENSE = "DELETE_ONE_EXPENSE"

const deleteExpense = (data) => ({
    type: DELETE_ONE_EXPENSE,
    payload: data
})


