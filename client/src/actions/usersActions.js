import axios from "axios"
import { baseUrl, storageKey, setStorageFunc, getStorageFunc } from "../lib/lib"
import { AsyncStorage } from "react-native"

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
            setStorageFunc(storageKey, token)
            console.log("getStorageFunc: ", await getStorageFunc(storageKey))
            return dispatch(signUpSuccess())
        } else {
            return dispatch(signUpFailure(_))
        }
    }).catch((error) => {
        return dispatch(signUpFailure(error))
    })
}
