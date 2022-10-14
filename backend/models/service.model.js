module.exports = (sequelize, Sequelize) => {
    const service = sequelize.define("genre", {
        serviceId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        libelle: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return service;
};