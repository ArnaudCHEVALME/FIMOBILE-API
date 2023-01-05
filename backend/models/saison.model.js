module.exports = (sequelize, Sequelize) => {
    return sequelize.define("saison", {
        saisonId: {
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
        },
        bannierePath:{
            type:Sequelize.STRING,
            allowNull: true
        }
    });
};