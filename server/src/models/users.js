
import bcrypt from "bcrypt"

const user = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            validate: {
                isAlpha: true,
                len: [2, 35]
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [8, 35]
            }
        },
    })

    User.associate = (models) => {
        User.belongsToMany(models.Category, {
            as: "categories",
            through: "CategoryUsers",
            foreignKey: "userId",
            otherKey: "categoryId"
        });

        User.hasMany(models.Expense, {
            foreignKey: "userId",
        })
    };

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

    User.prototype.hashedPass = async function () {
        const saltRounds = 10;
        return await bcrypt.hash(this.password, saltRounds);
    }

    User.prototype.validatePass = async function (password) {
        return await bcrypt.compare(password, this.password);
    }

    return User
}

export default user