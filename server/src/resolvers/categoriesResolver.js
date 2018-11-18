
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
            async (parent, { name }, { me, models }, info) => {
                return await models.Category
                    .create({
                        name,
                    }).then(cat => {
                        cat.addUser(me.id)
                        return cat
                    })
            }
        ),

        updateCategory: combineResolvers(
            isAuthenticated,
            async (parent, { id, name }, { models }) => {
                return await models.Category
                    .findById(id)
                    .then((category) => {
                        category.update({
                            name: name
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

