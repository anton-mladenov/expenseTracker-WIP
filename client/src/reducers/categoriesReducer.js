import { CREATE_CATEGORY, GET_ALL_CATEGORIES } from "../actions/categoriesActions"

const initialState = []

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case CREATE_CATEGORY:
            return [...state, { [payload.id]: payload.name }]

        case GET_ALL_CATEGORIES:
            return payload

        default:
            return state
    }
}