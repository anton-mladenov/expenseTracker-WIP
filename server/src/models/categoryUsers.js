
export default (sequelize, DataTypes) => {
    const CategoryUsers = sequelize.define("CategoryUsers", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        }, 
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Category",
                key: "id"
            }
        }
    })
    return CategoryUsers
}