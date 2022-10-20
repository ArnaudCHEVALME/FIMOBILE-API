module.exports = (sequelize, Sequelize) => {
    const Saison = sequelize.define("saison", {
        datesaison: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        theme: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Saison;
};