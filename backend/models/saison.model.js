module.exports = (sequelize, Sequelize) => {
    const Saison = sequelize.define("saison", {
        IdSaison: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        dateSaison: {
            type: Sequelize.DATE,
            allowNull: false
        },
        theme: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Saison;
};