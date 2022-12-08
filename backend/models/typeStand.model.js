module.exports = (sequelize, Sequelize) => {
    const TypeStand = sequelize.define("typeStand", {
        typeStandId: {
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
    return TypeStand;
};