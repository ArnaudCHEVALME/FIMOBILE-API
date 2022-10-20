module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
        roleId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Role;
};
