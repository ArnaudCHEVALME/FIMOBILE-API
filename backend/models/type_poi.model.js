module.exports = (sequelize, Sequelize) => {
    const type_poi = sequelize.define("genre", {
        type_poiId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        libelle: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return type_poi;
};