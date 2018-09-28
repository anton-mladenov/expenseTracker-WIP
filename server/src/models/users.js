const user = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
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

    return User
}

export default user