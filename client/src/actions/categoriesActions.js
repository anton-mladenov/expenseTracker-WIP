import { AsyncStorage } from "react-native"
import { baseUrl, jwtDecodeToExpDate, storageKey, removeStorageFunc, stringToInt, availableColors } from "../lib/lib"
import axios from "axios"
import { logoutType } from "./usersActions"


// CREATE A NEW CATEGORY
export const CREATE_CATEGORY = "CREATE_CATEGORY"

const createCategory = (category) => ({
    type: CREATE_CATEGORY,
    payload: category
})

export const createNewCategory = (newCategory) => (dispatch, getState) => {

    const state = getState()
    if (!state.currentUserReducer) return removeStorageFunc(storageKey)

    const jwt = state.currentUserReducer
    if (jwtDecodeToExpDate(jwt)) return removeStorageFunc(storageKey)

    let usedColors = state.categories.map((category) => category.color)

    let allColors = availableColors.filter( (color) => usedColors.indexOf(color) === -1 )

    axios({
        url: baseUrl,
        headers: { "x-token": `${jwt}` },
        method: 'post',
        data: {
            query: `
            mutation {
                createCategory(name: "${newCategory}", color: "${allColors[0]}") {
                    id
                    name
                    color
                    amount
                }
              }
            `
        }
    }).then((result) => {
        let resultIntoArray = []
        resultIntoArray.push(result.data.data.createCategory)
        const intResults = stringToInt(resultIntoArray)
        dispatch(createCategory(intResults[0]))
    }).catch((error) => {
        console.log("There was an error when creating the new category: " + error)
        return "There was an error when creating the new category: " + error
    })
}

// GET ALL CATEGORIES

export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"

const allCategories = (data) => ({
    type: GET_ALL_CATEGORIES,
    payload: data
})

export const getAllCategories = () => (dispatch, getState) => {

    const state = getState()
    if (!state.currentUserReducer) return removeStorageFunc(storageKey)

    const jwt = state.currentUserReducer
    if (jwtDecodeToExpDate(jwt)) {        
        console.log("jwtDecodeToExpDate: ", jwtDecodeToExpDate(jwt))
        removeStorageFunc(storageKey)
        dispatch(logoutType())
    } 

    axios({
        url: baseUrl,
        headers: { "x-token": `${jwt}` },
        method: "post",
        data: {
            query: `
                query {
                    categories{
                        id
                        name
                        amount
                        color
                        expenses {
                            id
                            name
                            amount
                        }
                    }
                }
            `
        }
    }).then((result) => {
        const intResults = stringToInt(result.data.data.categories)
        dispatch(allCategories(intResults))
    }).catch((error) => {
        console.log("There was an error when getting all categories: " + error)
        return error
    })
}


// GET ONE CATEGORY

export const GET_A_CATEGORY = "GET_A_CATEGORY"

const getCategory = (data) => ({
    type: GET_A_CATEGORY,
    payload: data
})

export const getOneCategory = (data) => (dispatch, getState) => {

    const state = getState()
    if (!state.currentUserReducer) return removeStorageFunc(storageKey)

    const jwt = state.currentUserReducer
    if (jwtDecodeToExpDate(jwt)) return removeStorageFunc(storageKey)

    axios({
        url: baseUrl,
        headers: { "x-token": `${jwt}` },
        method: "post",
        data: {
            query: `
			query {
				category(id: ${data}) {
					id
					name
                    amount
                    color
                    expenses {
                        id
                        name
                        amount
                    }
				}
			}
			`
        }
    }).then((result) => {
        let resultIntoArray = []
        resultIntoArray.push(result.data.data.category)
        const intResults = stringToInt(resultIntoArray)
        dispatch(getCategory(intResults[0]))        
    }).catch((error) => {
        console.log("There was an error when getting one category: " + error)
        return "There was an error when getting one category: " + error
    })
}


// UPDATE A CATEGORY 

export const UPDATE_A_CATEGORY = "UPDATE_A_CATEGORY"

const updateCategory = (data) => ({
    type: UPDATE_A_CATEGORY,
    payload: data
})

export const updateOneCategory = (id, name) => (dispatch, getState) => {

    const state = getState()
    if (!state.currentUserReducer) return removeStorageFunc(storageKey)

    const jwt = state.currentUserReducer
    if (jwtDecodeToExpDate(jwt)) return removeStorageFunc(storageKey)

    axios({
        url: baseUrl,
        headers: { "x-token": `${jwt}` },
        method: "post",
        data: {
            query: `
            mutation {
                updateCategory(id: ${id}, name: "${name}"){
                    id
                    name
                    color
                    expenses {
                        id
                        name
                        amount
                    }
                }
              }
            `
        }
    }).then((result) => {
        const intResults = stringToInt(result.data.data.updateCategory)
        console.log({intResults})
        dispatch(updateCategory(intResults))
    }).catch((error) => {
        console.log("There was an error when trying to update a category: " + error)
        return "There was an error when trying to update a category: " + error
    })
}

// DELETE A CATEGORY

export const DELETE_A_CATEGORY = "DELETE_A_CATEGORY"

const deleteCategory = (data) => ({
    type: DELETE_A_CATEGORY,
    payload: data
})

export const deleteOneCategory = (data) => (dispatch, getState) => {
    console.log({data})
    const state = getState()
    if (!state.currentUserReducer) return removeStorageFunc(storageKey)

    const jwt = state.currentUserReducer
    console.log({jwt})
    if (jwtDecodeToExpDate(jwt)) return removeStorageFunc(storageKey)

    axios({
        url: baseUrl,
        headers: { "x-token": `${jwt}` },
        method: "post",
        data: {
            query: `
			mutation {
				deleteCategory(id: ${data})
			}
			`
        }
    })
    .then((category) => {
        console.log({category})                           // da polzvam li vuobshte DELETE action?
        dispatch(deleteCategory(data))
    }).catch((error) => {
        console.log("There was an error when trying to delete a category: " + error)
        return "There was an error when trying to delete a category: " + error
    })
}
