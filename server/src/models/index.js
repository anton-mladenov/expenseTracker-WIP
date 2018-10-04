
import Sequelize from "sequelize"

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: "postgres"
    }
)

const models = {
    User: sequelize.import("./users"),
    Category: sequelize.import("./categories"),
    // Expenses: sequelize.import("./expenses")
}

Object.keys(models).forEach(key => {
    if ("associate" in models[key]) {
        models[key].associate(models)
    }
})

// db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});

// models.User.belongsToMany(models.Category, { as: "Categories", through: "user_category", foreignKey: "userId", otherKey: "categoryId"})
// models.Category.belongsToMany(models.User, { as: "Users", through: "user_category", foreignKey: "categoryId", otherKey: "userId"})

export { sequelize }

export default models