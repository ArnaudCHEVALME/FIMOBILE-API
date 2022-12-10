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
        },
        nbRecherche: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return SousGenre;
};
