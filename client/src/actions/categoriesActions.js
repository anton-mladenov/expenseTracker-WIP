
import { baseUrl, jwtDecodeToExpDate } from "../lib/lib"
import axios from "axios"
import { logout } from "./usersActions"

// CREATE A NEW CATEGORY
export const CREATE_CATEGORY = "CREATE_CATEGORY"

const createCategory = (category) => ({
	type: CREATE_CATEGORY,
	payload: category
})

export const createNewCategory = (newCategory) => (dispatch, getState) => {

	// const state = getState()
	// if (!state.currentUserReducer) return logout()

	// const jwt = state.currentUserReducer.jwt
	// if (jwtDecodeToExpDate(jwt)) return logout()

	axios({
		url: baseUrl,
		method: 'post',
		data: {
			query: `
            mutation {
                createCategory(name: "${newCategory}") {
                    id
                    name
                }
              }
            `
		}
	}).then((result) => {
		console.log("heeye: ", result.data.data.createCategory)
		dispatch(createCategory(result.data.data.createCategory))
	}).catch((error) => {
		console.log("There was an error when creating the new category" + error)
		return "There was an error when creating the new category" + error
	})
}


// GET ALL CATEGORIES

export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"

const allCategories = (data) => ({
	type: GET_ALL_CATEGORIES,
	payload: data
})

export const getAllCategories = () => (dispatch, getState) => {

	// const state = getState()
	// if (!state.currentUserReducer) return logout()

	// const jwt = state.currentUserReducer.jwt
	// if (jwtDecodeToExpDate(jwt)) return logout()

	axios({
		url: baseUrl,
		method: "post",
		data: {
			query: `
            query {
                categories{
                    id
                    name
                    amount
                }
              }
            `
		}
	}).then((result) => {
		console.log(" RESULT DATA: ", result.data.data.categories)
		dispatch(allCategories(result.data.data.categories))
	}).catch((error) => {
		console.log("There was an error when getting all categories" + error)
		return "There was an error when getting all categories" + error
	})
}


// DELETE A CATEGORY

export const DELETE_A_CATEGORY = "DELETE_A_CATEGORY"

const deleteCategory = (data) => ({
	type: DELETE_A_CATEGORY,
	payload: data
})

export const deleteOneCategory = (data) => (dispatch, getState) => {

	// const state = getState()
	// if (!state.currentUserReducer) return logout()

	// const jwt = state.currentUserReducer.jwt
	// if (jwtDecodeToExpDate(jwt)) return logout()

	axios({
		url: baseUrl,
		method: "post",
		data: {
			query: `
			mutation {
				deleteCategory(id: ${data})
			}
			`
		}
	}).then((category) => {
		console.log(category.data.data.deleteCategory)
		console.log(category.data.data)
	}).catch((error) => {
		console.log("There was an error when trying to delete a category" + error)
		return "There was an error when trying to delete a category" + error
	})
}