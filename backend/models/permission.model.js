module.exports = (sequelize, Sequelize) => {
    const Permission = sequelize.define("permission", {
        permId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Permission;
};
