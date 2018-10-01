
const expenses = (sequelize, DataTypes) => {

    const Expenses = sequelize.define("Expenses", {
        category: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.INTEGER
        },
    })

    return Expenses
}

export default expenses