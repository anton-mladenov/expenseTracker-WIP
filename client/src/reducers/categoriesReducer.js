import {
    CREATE_CATEGORY,
    GET_ALL_CATEGORIES,
    GET_A_CATEGORY,
    DELETE_A_CATEGORY,
    UPDATE_A_CATEGORY
} from "../actions/categoriesActions"

const initialState = []

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case CREATE_CATEGORY:
            return [...state, payload]

        case GET_ALL_CATEGORIES:
            return payload

        case GET_A_CATEGORY:
            return [state.find((category) => category.id === payload.id)]

        case UPDATE_A_CATEGORY:
            return [payload]

        // case DELETE_A_CATEGORY:
        //     console.log({ payload }, { state })
        //     return state.filter(category => category.id !== payload)

        default:
            return state
    }
}