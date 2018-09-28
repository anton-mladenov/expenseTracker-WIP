
import bcrypt from "bcrypt"

const user = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    })

    User.associate = (models) => {
        User.hasMany(models.Message, {
            onDelete: "CASCADE"
        })    
    }

    User.findByLogin = async (login) => {
        let user = await User.findOne({
            where: {
                name: login
            }
        })

        if (!user) {
            user = await User.findOne({
                where: {
                    name: login
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

    return User
}

export default user