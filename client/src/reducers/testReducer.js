import { TEST } from "../actions/testActions"

const initialState = "hey"

export default (state = initialState, { type, payload }) => {
    
    switch (type) {
        
        case TEST:
            console.log(" ____ TESTING from Reducers! ", payload)
            return [payload, initialState]
        
        default:
            return state
    }
}