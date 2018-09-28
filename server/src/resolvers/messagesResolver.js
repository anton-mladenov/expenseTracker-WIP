import { request } from "superagent"
import { baseUrl } from "../constants"
import uuidv4 from "uuid/v4"
import { isAuthenticated, isMessageOwner } from "./authorization"
import { combineResolvers } from "graphql-resolvers"

export default {
    Query: {
        message: async (parent, { id }, { models }) => {
            return await models.Message.findById(id)
        },
        messages: async (parent, args, { models }, info) => {
            return await models.Message.findAll()
        } 
    },
    Mutation: {
        createMessage: combineResolvers(
            isAuthenticated,
            async (parent, { text }, { me, models }, info) => {
                return await models.Message.create({
                    text,
                    userId: me.id
                })
            }
        ),
        deleteMessage: combineResolvers(
            isAuthenticated,
            isMessageOwner,
            async (parent, { id }, { models }) => {
                return await models.Message.destroy({ where: { id }})
            }
        )
    },
    Message: {
        user: async (message, args, { models }) => {
            return await models.Message.findById(message.userId)
        }
    },
}

