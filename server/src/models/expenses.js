
const expenses = (sequelize, DataTypes) => {

    const Expense = sequelize.define("expense", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isNumeric: true,
            }
        },
    })

    return Expense
}

export default expenses