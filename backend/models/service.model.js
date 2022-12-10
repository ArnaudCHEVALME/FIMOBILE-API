module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("service", {
        serviceId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nbRecherche: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return Service;
};