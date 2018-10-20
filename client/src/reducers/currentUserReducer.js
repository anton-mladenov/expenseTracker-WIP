import { storageKey, getStorageFunc } from "../lib/lib"
import { LOGOUT, SIGN_IN_SUCCESS, SET_JWT } from "../actions/usersActions"

let initialState = null

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case SET_JWT:
            return payload

        case SIGN_IN_SUCCESS:
            return payload

        case LOGOUT:
            return null

        default:
            return state
    }
}

