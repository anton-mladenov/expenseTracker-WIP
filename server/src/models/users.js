
import bcrypt from "bcrypt"

const user = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            singular: 'user',
            plural: 'users',
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        }
    })

    User.associate = (models) => {
        User.belongsToMany(models.Category, {
            as: "categories",
            through: "CategoryUsers",
            foreignKey: "userId", 
            otherKey: "categoryId"
        });
    };

    // models.User.belongsToMany(models.Category, 
    // { as: "Categories", through: "user_category", foreignKey: "userId", otherKey: "categoryId"})

    User.findByLogin = async (login) => {
        let user = await User.findOne({
            where: {
                name: login
            }
        })

        if (!user) {
            user = await User.findOne({
                where: {
                    email: login
                }
            })
        }

        return user
    }

    User.beforeCreate(
        async (user) => {
            user.password = await user.hashedPass()
        }
    )

    User.prototype.hashedPass = async function() {
        const saltRounds = 10;
        return await bcrypt.hash(this.password, saltRounds);
    }

    User.prototype.validatePass = async function(password) {
        return await bcrypt.compare(password, this.password);
    }

    return User
}

export default user