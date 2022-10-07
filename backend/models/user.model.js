const bcrypt = require('bcrypt');
// function cryptPassword(password, callback) {
//     bcrypt.genSalt(10, function (err, salt) { // Encrypt password using bycrpt module
//         if (err)
//             return callback(err);

//         bcrypt.hash(password, salt, function (err, hash) {
//             return callback(err, hash);
//         });
//     });
// }

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
        pseudo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { isEmail: true }
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
            instanceMethods: {
                validPassword: (password) => {
                    return bcrypt.compareSync(password, this.password);
                }
            }
        }
    );

    // User.beforeCreate(function (model, options, cb) {
    //     debug('Info: ' + 'Storing the password');
    //     cryptPassword(user.password, function (err, hash) {
    //         if (err) return cb(err);
    //         debug('Info: ' + 'getting ' + hash);

    //         user.password = hash;
    //         return cb(null, options);
    //     });
    // });

    User.prototype.validPassword = async (password, hash) => {
        return await bcrypt.compareSync(password, hash);
    }
    return User;
}