import { CREATE_ONE_EXPENSE } from "../actions/expensesActions"

const initialValue = []

export default (state = initialValue, { type, payload }) => {

    switch (type) {

        case CREATE_ONE_EXPENSE:
            return [...state, payload]

        default:
            return state
    }
}