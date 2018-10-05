
const expenses = (sequelize, DataTypes) => {

    const Expenses = sequelize.define("Expenses", {
        // category: {
        //     type: DataTypes.INTEGER
        // },
        name: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.INTEGER
        },
    })

    // Expenses.associate = (models) => {
    //     Expenses.belongsTo(models.Category, {
    //         foreignKey: "categoryId",
    //         targetKey: "expenseId"
    //     })
    // };

    return Expenses
}

export default expenses