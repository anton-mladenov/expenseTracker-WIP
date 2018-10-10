
import { isAuthenticated, isMessageOwner } from "./authorization"
import { combineResolvers } from "graphql-resolvers"

export default {

    Query: {

        category: async (parent, { id }, { models }) => {
            return await models.Category.findById(id)
        },

        categories: async (parent, args, { models }, info) => {
            return await models.Category.findAll()
        }

    },
    Mutation: {

        createCategory: combineResolvers(
            // isAuthenticated,
            async (parent, { name }, { me, models }, info) => {
                return await models.Category.create({
                    name,
                })
                    .then(cat => {
                        cat.addUser(me.id)
                        return cat
                    })
            }
        ),

        deleteCategory: combineResolvers(
            // isAuthenticated,
            // isMessageOwner,
            async (parent, { id }, { models }) => {
                return await models.Category.destroy({ where: { id } })
            }
        )

    },
    Category: {

        user: async (parent, args, { me, models }) => {
            return await models.User.findById(me.id)
        },

        expenses: async (parent, args, { models }) => {
            return await models.Expense.findAll({ where: { categoryId: parent.id } })
        }

    },
}

