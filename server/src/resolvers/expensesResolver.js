import { combineResolvers } from "graphql-resolvers"
// imports here from the authentication file

export default {

    Query: {
        expense: async (parent, { id, categoryId }, { me, models }) => {
            return await models.Expense
                .findById(id)
                .then(async (expense) => {
                    return await models.Category
                        .findById(categoryId)
                        .then((category) => {
                            category.getExpenses()
                            return expense
                        })
                })
        },

        allExpenses: async (parent, { categoryId }, { models }) => {
            return await models.Expense
                .findAll()
        }
    },

    Mutation: {

        createExpense: combineResolvers(
            // authentication resolver here
            async (parent, { name, amount, categoryId }, { me, models }) => {
                // first, find category. second, create expense. third, assign expense to category.
                // then, find user and assign it to the expense. finally, return the expense. 
                return await models.Category
                    .findById(categoryId)
                    .then(async (category) => {

                        return await models.Expense
                            .create({
                                name,
                                amount,
                            })
                            .then(async (expense) => {
                                category.addExpenses(expense)

                                // increment category's amount and save it
                                category.amount += amount
                                category.save()

                                return await models.User
                                    .findById(me.id)
                                    .then((user) => {
                                        user.addExpenses(expense)
                                        return expense
                                    })
                            })
                    })
            }
        ),

        updateExpense: combineResolvers(
            // authentication resolver here
            async (parent, { id, name, amount }, { me, models }) => {
                const update = { name, amount }
                const idInt = parseInt(id, 10)
                return await models.Expense
                    .findById(idInt)
                    .then(expense => {
                        if (expense.id !== idInt) {
                            return "No expense found with this ID"
                        } else {
                            return expense.update(update)
                        }
                    })
            }
        ),

        deleteExpense: combineResolvers(
            // authentication resolver here
            async (parent, { id }, { models }) => {
                return await models.Expense
                    .destroy({ where: { id } })
            }
        )

    },

    Expense: {
        category: async (parent, args, { models }) => {
            return await models.Category
                .findById(parent.dataValues.categoryId)
        },
        user: async (parent, args, { models }) => {
            return await models.User
                .findById(parent.dataValues.userId)
        }
    }

}