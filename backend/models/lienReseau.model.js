module.exports = (sequelize, Sequelize) => {
    const LienReseau = sequelize.define("lienReseau", {
        lienReseauId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        lien: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: { isUrl: true }
        }
    });
    return LienReseau;
};