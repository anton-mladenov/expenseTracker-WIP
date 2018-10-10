import { CREATE_CATEGORY, GET_ALL_CATEGORIES, GET_A_CATEGORY } from "../actions/categoriesActions"

const initialState = []

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case CREATE_CATEGORY:
            // return [...state, { [payload.id]: payload.name }]
            return [...state, payload]

        case GET_ALL_CATEGORIES:
            return payload

        case GET_A_CATEGORY:
            return payload

        default:
            return state
    }
}