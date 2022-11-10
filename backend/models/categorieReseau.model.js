module.exports = (sequelize, Sequelize) => {
    const CategorieReseau = sequelize.define("categorieReseau", {
        categorieReseauId: {
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
    return CategorieReseau;
};