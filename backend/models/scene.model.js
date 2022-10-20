module.exports = (sequelize, Sequelize) => {
    const Scene = sequelize.define("scene", {
        sceneId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        capacite: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        latitude: {
            type: Sequelize.REAL,
            allowNull: false
        },
        logitude: {
            type: Sequelize.REAL,
            allowNull: false
        },
        interieur: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Scene;
};