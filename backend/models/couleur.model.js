module.exports = (sequelize, Sequelize) => {
    const Couleur = sequelize.define("couleur", {
        couleurId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        valeurHexa: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Couleur;
};
