
const category = (sequelize, DataTypes) => {

    const Category = sequelize.define("category", {
        name: {
            type: DataTypes.STRING,
        },
        amount: {
            type: DataTypes.INTEGER
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
