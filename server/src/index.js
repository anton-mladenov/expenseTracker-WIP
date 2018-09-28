import "dotenv/config"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import cors from "cors"
// import bodyParser from "body-parser"
import typeDefs from "./schema/index"
import resolvers from "./resolvers/index"
import models, { sequelize } from "./models/index"

const app = express()
const port = 4000

app.use(cors())
// app.use // nqkyv bodyparser
// app.use // nqkuv router

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => ({
        models,
        me: await models.User.findByLogin("Anton The Developer")
    }),
})

server.applyMiddleware({ app })

let eraseDatabaseOnSync = true

sequelize.sync({ force: eraseDatabaseOnSync }).then(
    async () => {
        if (eraseDatabaseOnSync) {
            createNewUser()
        }
        app.listen(port, () => {
            console.log(`🚀 Server ready at ${server.graphqlPath} and ${process.env.SOME_SECRET_VARIABLE}`)
        })
    }
)

let createNewUser = async () => {
    return await models.User.create(
    {
        name: "Anton The Developer",
        messages: [{
            text: "Rocking GrapQL lika a true rock star!!!"
        }]
    },
    {
        include: [models.Message]
    })
}