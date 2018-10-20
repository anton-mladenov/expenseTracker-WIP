import axios from "axios"
import { baseUrl, storageKey, setStorageFunc, getStorageFunc } from "../lib/lib"


// JWT 

export const SET_JWT = "SET_JWT"

export const setJWT = (obj) => ({
    type: SET_JWT,
    payload: obj
})


// SIGN UP 

export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE"

const signUpSuccess = () => ({
    type: SIGN_UP_SUCCESS,
})

const signUpFailure = (error) => ({
    type: SIGN_UP_FAILURE,
    payload: error || "Sign Up Error"
})

export const newSignUp = (payload) => (dispatch) => {

    const { name, email, password } = payload

    axios({
        url: baseUrl,
        method: "post",
        data: {
            query: `
            mutation {
                signUp(name: "${name}", email: "${email}", password: "${password}") {
                    token
                }
            }
            `
        }
    }).then(async (result) => {
        const token = result.data.data.signUp.token
        if (token) {
            await setStorageFunc(storageKey, token)
            return dispatch(signUpSuccess())
        } else {
            return dispatch(signUpFailure(_))
        }
    }).catch((error) => {
        return dispatch(signUpFailure(error))
    })
}


// SIGN IN

export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS"
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE"

export const signInSuccess = (data) => ({
    type: SIGN_IN_SUCCESS,
    payload: data
})

const signInFailure = (error) => ({
    type: SIGN_IN_FAILURE,
    payload: error || "Sign Ip Error"
})

export const newSignIn = (data) => (dispatch) => {
    const { email, password } = data

    axios({
        url: baseUrl,
        method: "post",
        data: {
            query: `
            mutation {
                signIn(login: "${email}", password: "${password}") {
                    token
                }
            }
            `
        }
    }).then(async (result) => {
        const token = await result.data.data.signIn.token
        if (token) {
            await setStorageFunc(storageKey, token)
            return dispatch(signInSuccess(token))
        } else {
            return dispatch(signInFailure(_))
        }
    }).catch((error) => {
        return dispatch(signInFailure(error))
    })
}


// SIGN OUT 

export const LOGOUT = "LOGOUT"

const logoutType = () => ({
    type: SIGN_IN_SUCCESS,
})

export const logout = () => (dispatch) => {
    dispatch(logoutType())
}

