import { ForbiddenError } from "apollo-server"
import { combineResolvers, skip } from "graphql-resolvers"

export const isAuthenticated = (parent, args, { me }) => {
    me ? skip : new ForbiddenError("Not authenticated as THE user.")
}

// export const isAdmin = combineResolvers(
//     isAuthenticated,
//     (parent, args, { me: { role }}) => {

//         if (role === "ADMIN") {
//             return skip
//         }


//         throw new ForbiddenError("The user does not have ADMIN rights")


//         // console.log(" ___ LOGGING FROM: isAdmin Func + role: ", role)
//         // role === "ADMIN" ? skip : new ForbiddenError("The user does not have ADMIN rights")
//         // // role !== "ADMIN" ? new ForbiddenError("The user does not have ADMIN rights") : skip
//     }
// )

// export const isAdmin = combineResolvers(
//     isAuthenticated,
//     (parent, args, { me: { role } }) =>
//       role === 'ADMIN'
//         ? skip
//         : new ForbiddenError('Not authorized as admin.'),
//   );

export const isMessageOwner = (parent, { id }, { models, me }) => {
    const message = models.Message.findById(id, { raw: true })
    if (message.id !== me.id) {
        throw new ForbiddenError("Not authenticated as THE user.")
    }
    return skip
}
