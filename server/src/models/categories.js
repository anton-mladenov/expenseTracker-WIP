
const category = (sequelize, DataTypes) => {
    
    const Category = sequelize.define("category", {
        name: {
            type: DataTypes.STRING,
            // singular: 'category',
            // plural: 'categories',
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

        Category.hasMany(models.Expense, { as: "Expenses"})
    };

    // Category.associate = (models) => {
    //     Category.hasMany(models.Expense)
    // };
    
    return Category;
}

export default category
