module.exports = (sequelize, Sequelize) => {
    const Pays = sequelize.define("pays", {
        paysId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nompays: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Pays;
};
