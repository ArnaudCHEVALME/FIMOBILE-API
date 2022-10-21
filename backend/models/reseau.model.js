module.exports = (sequelize, Sequelize) => {
    const Reseau = sequelize.define("reseau", {
        reseauId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        lien: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Reseau;
};