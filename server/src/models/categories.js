
const category = (sequelize, DataTypes) => {
    
    const Category = sequelize.define("category", {
        name: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.INTEGER
        },
    })

    Category.associate = (models) => {
        Category.belongsToMany(models.User, {
            through: "CategoryUsers",
            as: "users",
            foreignKey: "categoryId"
        });
    };
    
    return Category;
}

export default category
