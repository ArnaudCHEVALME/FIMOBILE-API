module.exports = (sequelize, Sequelize) => {
    const Categorie_reseau = sequelize.define("categorie_reseau", {
        categorie_reseauId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Categorie_reseau;
};