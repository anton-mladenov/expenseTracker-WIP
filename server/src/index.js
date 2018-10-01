import "dotenv/config"
import express from "express"
import { ApolloServer, AuthenticationError } from "apollo-server-express"
import cors from "cors"
// import bodyParser from "body-parser"
import typeDefs from "./schema/index"
import resolvers from "./resolvers/index"
import models, { sequelize } from "./models/index"
import jwt from "jsonwebtoken"

const app = express()
const port = 4000

app.use(cors())
// app.use // nqkyv bodyparser
// app.use // nqkuv router

const getMe = async (req) => {
    const token = req.headers["x-token"]
    console.log(" ___ LOGGING FROM: getMe Func + token: ", token)

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
        console.log(" ____ LOGGING FROM: context + me: ", me)

        return {
            models,
            me,
            secret: process.env.SECRET
        }
    },
})

server.applyMiddleware({ app })

let eraseDatabaseOnSync = true

sequelize.sync({ force: eraseDatabaseOnSync }).then(
    async () => {
        if (eraseDatabaseOnSync) {
            createNewUser()
        }
        app.listen(port, () => {
            console.log()
            console.log(`🚀 Server ready at ${server.graphqlPath} and ${process.env.SOME_SECRET_VARIABLE}`)
            console.log()
        })
    }
)

let createNewUser = async () => {

    await models.Category.create(
        {
            name: "Groceries",
        }
    )

    await models.Category.create(
        {
            name: "Commute",
        }
    )

    await models.Category.create(
        {
            name: "Free Time",
        }
    )

    await models.User.create(
    {
        name: "Anton The Developer",
        email: "anton@anton.com",
        password: "tonka",
        // messages: [{
        //     text: "Rocking GrapQL lika a true rock star!!!"
        // }],
        role: "ADMIN"
    },
    // {
    //     include: [models.Message]
    // }
    )

    await models.User.create(
        {
            name: "Mr. Awesome DEV",
            email: "dev@dev.com",
            password: "devdevdevdev",
            // messages: [{
            //     text: "Doing back- and front- like a true pornstar"
            // }],
        },
        // {
        //     include: [models.Message]
        // }
        )
}