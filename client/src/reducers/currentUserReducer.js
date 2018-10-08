import { storageKey, getStorageFunc } from "../lib/lib"

const initialState = null

try {
    const jwt = getStorageFunc(storageKey)
    if (jwt) {
        initialState = { jwt }
    }
} catch (error) {
    console.log("There was error getting the JWT token from the AsyncStorage ", error)
}

export default (state = initialState, { type, payload }) => {

    switch (type) {



        default:
            return state
    }
}