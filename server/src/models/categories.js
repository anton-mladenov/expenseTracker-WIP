
const category = (sequelize, DataTypes) => {
    
    const Category = sequelize.define("category", {
        name: {
            type: DataTypes.STRING,
            singular: 'category',
            plural: 'categories',
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
        });
    };

    // models.Category.belongsToMany(models.User, 
    // { as: "Users", through: "user_category", foreignKey: "categoryId", otherKey: "userId"})
    
    return Category;
}

export default category
