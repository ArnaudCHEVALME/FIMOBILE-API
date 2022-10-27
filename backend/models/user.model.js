const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
            userId: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true
            },
            login: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {isEmail: true}
            },
        },
        {
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        user.password = await bcrypt.hash(user.password, 10);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password) {
                        user.password = await bcrypt.hash(user.password, 10);
                    }
                }
            },
            timestamps: false
        }
    );
    return User;
}