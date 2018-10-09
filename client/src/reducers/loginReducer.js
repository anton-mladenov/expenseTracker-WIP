import { LOGOUT } from "../actions/usersActions"

const initialState = {}

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case LOGOUT:
            return {
                error: payload
            }

        default:
            return state
    }
}