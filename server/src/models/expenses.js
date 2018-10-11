
const expenses = (sequelize, DataTypes) => {

    const Expense = sequelize.define("expense", {
        name: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.INTEGER
        },
    })

    return Expense
}

export default expenses