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
        visites: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: false
    });
    return Stand;
};