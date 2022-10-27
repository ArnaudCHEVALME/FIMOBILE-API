module.exports = (sequelize, Sequelize) => {
    const SousGenre = sequelize.define("sous_genre", {
        sous_genreId: {
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