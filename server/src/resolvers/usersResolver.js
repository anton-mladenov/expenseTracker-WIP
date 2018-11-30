
import jwt from "jsonwebtoken"
import { AuthenticationError, UserInputError } from "apollo-server"
import { combineResolvers } from "graphql-resolvers"
import { isAdmin } from "./authorization"

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
    },
    User: {
        categories: async (user, args, { models }) => {
            return await models.User
                .find({
                    include: [{
                        model: models.Category,
                        as: 'categories',
                    }]
                })
                .then((abc) => abc.getCategories())

        }
    },
    Mutation: {

        signUp: async (parent, { name, email, password }, { models, secret }) => {
            const user = await models.User.create({
                name,
                email,
                password
            })

            return { token: createToken(user, secret, "48h") }
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

            return { token: createToken(user, secret, "48h") }

        },
        // deleteUser: combineResolvers(
        //     isAdmin,
        //     async (parent, { id }, { models }) => {
        //         return await models.User.destroy({
        //             where: { id }
        //         })
        //     }
        // )
    }
}

