module.exports = (sequelize, Sequelize) => {
    const Couleurs = sequelize.define("couleurs", {
        couleurId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        valeurhexa: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Couleurs;
};
