import { request } from "superagent"
import { baseUrl } from "../constants"
import jwt from "jsonwebtoken"

let createToken = async (user, secret, expiresIn) => {
    const { id, email, name } = user
    return await jwt.sign({ id, email, name }, secret, { expiresIn })
}

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
        },
        signUp: async (parent, { name, email, password }, { models, secret }) => {
            const user = await models.User.create({
                name,
                email,
                password
            })

            return { token: createToken(user, secret, "30m") }
        }
    }
}

