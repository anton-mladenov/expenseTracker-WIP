
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
            isAuthenticated,
            async (parent, { name }, { me, models }, info) => {
                return await models.Category.create({
                    name,
                    userId: me.id
                })
            }
        ),
        deleteCategory: combineResolvers(
            isAuthenticated,
            isMessageOwner,
            async (parent, { id }, { models }) => {
                return await models.Category.destroy({ where: { id }})
            }
        )
    },
    // Category: {
    //     user: async (message, args, { models }) => {
    //         return await models.Category.findById(category.userId)
    //     }
    // },
}

