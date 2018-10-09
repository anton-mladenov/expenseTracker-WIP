import "dotenv/config"
import express from "express"
import { ApolloServer, AuthenticationError } from "apollo-server-express"
import cors from "cors"
// import bodyParser from "body-parser"
import typeDefs from "./schema/index"
import resolvers from "./resolvers/index"
import models, { sequelize } from "./models/index"
import jwt from "jsonwebtoken"
import bodyParser from "body-parser"

const app = express()
const port = 4000

app.use(cors())
app.options('*', cors());
app.use(bodyParser.json())
// app.use // nqkuv router

const getMe = async (req) => {
    const token = req.headers["x-token"]

    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET)
        } catch (error) {
            throw new AuthenticationError("Your session has expired")
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {

        const me = await getMe(req)
        // const me = {
        //     id: 1
        // }

        return {
            models,
            me,
            secret: process.env.SECRET
        }
    },
})

server.applyMiddleware({ app })

let eraseDatabaseOnSync = false

sequelize.sync({ force: eraseDatabaseOnSync }).then(
    async () => {

        createNewUser()

        app.listen(port, () => {

            console.log()
            console.log(`    🚀🚀🚀 Server ready at ${server.graphqlPath} and ${process.env.SOME_SECRET_VARIABLE} 🚀🚀🚀  `)
            console.log()
        })
    }
)

let createNewUser = async () => {

    await models.User.create(
        {
            name: "Anton The Developer",
            email: "anton@anton.com",
            password: "tonka",
            role: "ADMIN"
        },
    )

    await models.User.create(
        {
            name: "Mr. Awesome DEV",
            email: "dev@dev.com",
            password: "devdevdevdev",
        },
    )
}
