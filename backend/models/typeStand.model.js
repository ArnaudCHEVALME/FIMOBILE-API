module.exports = (sequelize, Sequelize) => {
    return sequelize.define("typeStand", {
        typeStandId: {
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
};