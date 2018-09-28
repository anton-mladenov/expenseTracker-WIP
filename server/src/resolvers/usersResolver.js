import { request } from "superagent"
import { baseUrl } from "../constants"

export default {
    Query: {
        user: async (parent, { id }, { models }) => {
            return await models.User.findById(id)
        },
        allUsers: async (parent, args, { models }) => {
            return await models.User.findAll()
        },
        me: async (parent, args, { me, models }) => {
            return await models.User.findById(me.id)
        },
    },
    User: {
        messages: async (user, args, { models }) => {
            return await models.User.findAll({
                where: {
                    userId: user.id
                }
            })
        } 
    },
    Mutation: {
        createNewUser: async (parent, { name, age }, { models }) => {
            return models.User.create({
                name, 
                age
            })
        }
    }
}

