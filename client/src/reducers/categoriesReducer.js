import { CREATE_CATEGORY } from "../actions/categoriesActions"

const initialState = {}

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case CREATE_CATEGORY:
            console.log(" ____ TESTING from Reducers! ", { payload })
            return payload

        default:
            return state
    }
}