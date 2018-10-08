
import { baseUrl } from "../lib/lib"
import { createApolloFetch } from "apollo-fetch"
import axios from "axios"

// CREATE APOLLO FETCH INSTANCE
const fetch = createApolloFetch({
    uri: baseUrl
})


// CREATE A NEW CATEGORY
export const CREATE_CATEGORY = "CREATE_CATEGORY"

const createCategory = (category) => ({
    type: CREATE_CATEGORY,
    payload: category
})

export const createNewCategory = (newCategory) => (dispatch, getState) => {
    console.log(" ____ TESTING from Action Creators! ", typeof newCategory, newCategory)

    axios({
        url: baseUrl,
        method: 'post',
        data: {
            query: `
            mutation {
                createCategory(name: "${newCategory}") {
                  name
                }
              }
            `
        }
    })
        .then((result) => {
            console.log({ result })
        })
}

