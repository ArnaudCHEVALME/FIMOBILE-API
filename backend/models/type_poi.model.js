module.exports = (sequelize, Sequelize) => {
    const Type_poi = sequelize.define("type_poi", {
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
    }, {
        timestamps: false
    });
    return Type_poi;
};