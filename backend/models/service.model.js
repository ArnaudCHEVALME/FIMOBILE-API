module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("service", {
        serviceId: {
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
    return Service;
};