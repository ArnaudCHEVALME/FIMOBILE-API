module.exports = (sequelize, Sequelize) => {
    const Reseau = sequelize.define("reseau", {
        reseauId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        lien: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {isUrl: true}
        }
    }, {
        timestamps: false
    });
    return Reseau;
};