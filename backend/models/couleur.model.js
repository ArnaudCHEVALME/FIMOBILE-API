module.exports = (sequelize, Sequelize) => {
    const Couleurs = sequelize.define("couleurs", {
        couleurId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        valeurhexa1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        valeurhexa2: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Couleurs;
};
