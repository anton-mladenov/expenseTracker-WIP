
const category = (sequelize, DataTypes) => {

    const Category = sequelize.define("category", {
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

    Category.associate = (models) => {

        Category.belongsToMany(models.User, {
            as: "users",
            through: "CategoryUsers",
            foreignKey: "categoryId",
            otherKey: "userId"
        })

        Category.hasMany(models.Expense, {
            foreignKey: "categoryId",
        })
    };

    return Category;
}

export default category
