module.exports = (sequelize, Sequelize) => {
    const Concert = sequelize.define("concert", {
        concertId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        debut: {
            type: Sequelize.DATE,
            allowNull: false
        },
        duree: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nbPersonne: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        nbRecherche: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    });
    return Concert;
};