import { request } from "superagent"
import { baseUrl } from "../constants"
import jwt from "jsonwebtoken"
import { AuthenticationError, UserInputError } from "apollo-server"

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
        },
        signIn: async (parent, { login, password }, { models, secret }) => {
            const user = await models.User.findByLogin(login)
            
            if (!user) {
                throw new UserInputError("Login details do NOT match any user")
            }

            const validated = await user.validatePass(password)

            if (!validated) {
                throw new AuthenticationError("Wrong password, try again.")
            }

            return { token: createToken(user, secret, "30m") }

        }
    }
}

