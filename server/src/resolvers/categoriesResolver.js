
import { isAuthenticated, isMessageOwner } from "./authorization"
import { combineResolvers } from "graphql-resolvers"

export default {

    Query: {

        category: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models }) => {
                return await models.Category
                    .findById(id)
            }),

        categories: combineResolvers(
            isAuthenticated,
            async (parent, args, { me, models }, info) => {
                return await models.Category
                    .findAll()
                    .then(async (categories) => {
                        return await models.User
                            .findById(me.id)
                            .then(async (me) => {
                                let myCategories = await me.getCategories()
                                return myCategories
                            })
                    })
            })

    },
    
    Mutation: {

        createCategory: combineResolvers(
            isAuthenticated,
            async (parent, { name, color }, { me, models }, info) => {
                console.log("name: ", typeof name, name, " & color: ", typeof color, color)
                return await models.Category
                    .create({
                        name,
                        color
                    }).then(cat => {
                        cat.addUser(me.id)
                        console.log( " cat: ", cat)
                        return cat
                    })
            }
        ),

        updateCategory: combineResolvers(
            isAuthenticated,
            async (parent, { id, name, color }, { models }) => {
                return await models.Category
                    .findById(id)
                    .then((category) => {
                        category.update({
                            name: name,
                            color: color
                        })
                        return category
                    })
            }
        ),

        deleteCategory: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models }) => {
                return await models.Category
                    .destroy({ where: { id } })
            }
        )

    },
    Category: {

        user: combineResolvers(
            isAuthenticated,
            async (parent, args, { me, models }) => {
                return await models.User
                    .findById(me.id)
            }),

        expenses: combineResolvers(
            isAuthenticated,
            async (parent, args, { models }) => {
                return await models.Expense
                    .findAll({ where: { categoryId: parent.id } })
            })

    },
}

