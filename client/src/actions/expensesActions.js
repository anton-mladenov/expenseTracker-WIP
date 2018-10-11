
import { baseUrl, jwtDecodeToExpDate } from "../lib/lib"
import axios from "axios"
import { logout } from "./usersActions"


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
            
            `
        }
    }).then((result) => {
        console.log("result.data", result.data)
    }).catch((error) => {
        console.log("There was an error when creating the new expense " + error)
        return "There was an error when creating the new expense " + error
    })
}


// GET ALL EXPENSES

export const GET_ALL_EXPENSES = "GET_ALL_EXPENSES"

const getExpenses = (data) => ({
    type: GET_ALL_EXPENSES,
    payload: data
})



// CREATE NEW EXPENSE 

export const CREATE_ONE_EXPENSE = "CREATE_ONE_EXPENSE"

const createExpense = (data) => ({
    type: CREATE_ONE_EXPENSE,
    payload: data
})



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


