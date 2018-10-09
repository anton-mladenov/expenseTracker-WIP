import { storageKey, getStorageFunc } from "../lib/lib"
import { LOGOUT, SIGN_IN_SUCCESS } from "../actions/usersActions"

let initialState = null

// try {
//     const jwt = getStorageFunc(storageKey)
//     if (jwt) {
//         initialState = { jwt }
//     }
// } catch (error) {
//     console.log("There was error getting the JWT token from the AsyncStorage ", error)
// }

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case SIGN_IN_SUCCESS:
            return payload

        case LOGOUT:
            return null

        default:
            return state
    }
}

