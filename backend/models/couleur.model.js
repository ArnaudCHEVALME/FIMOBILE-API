module.exports = (sequelize, Sequelize) => {
    const Couleurs = sequelize.define("couleurs", {
        couleurID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        valeurhexa: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Couleurs;
};
