module.exports = (sequelize, Sequelize) => {
    const Genre = sequelize.define("genre", {
        genreId: {
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
    return Genre;
};
