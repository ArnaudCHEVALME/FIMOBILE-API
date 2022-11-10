module.exports = (sequelize, Sequelize) => {
    const SousGenre = sequelize.define("sousGenre", {
        sousGenreId: {
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
    return SousGenre;
};
