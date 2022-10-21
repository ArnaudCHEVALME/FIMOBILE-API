const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
            id_user: {
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
                        const salt = await bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            },
            timestamps: false
        }
    );
    return User;
}