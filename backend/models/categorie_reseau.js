module.exports = (sequelize, Sequelize) => {
    const Categorie_reseau = sequelize.define("categorie_reseau", {
        Categorie_reseauId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        libelle: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Categorie_reseau;
};