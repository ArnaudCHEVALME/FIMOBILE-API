module.exports = (sequelize, Sequelize) => {
    const Type_stand = sequelize.define("type_stand", {
        type_standId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Type_stand;
};