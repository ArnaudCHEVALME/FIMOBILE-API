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
            allowNull: true
        },
        visites: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
    });
    return Concert;
};