module.exports = (sequelize, Sequelize) => {
    const Stand = sequelize.define("stand", {
        standId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        longitude: {
            type: Sequelize.REAL,
            allowNull: false
        },
        latitude: {
            type: Sequelize.REAL,
            allowNull: false
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nbRecherche: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return Stand;
};