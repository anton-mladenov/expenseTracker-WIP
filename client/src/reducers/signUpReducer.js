import { SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "../actions/usersActions"

const initialState = {}

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case SIGN_UP_SUCCESS:
            return {
                success: true
            }

        case SIGN_UP_FAILURE:
            return {
                error: payload
            }

        default:
            return state
    }
}