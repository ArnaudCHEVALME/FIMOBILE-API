module.exports = (sequelize, Sequelize) => {
    const Artiste = sequelize.define("artiste", {
        artisteId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bio: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        baniere_path: {
            type: Sequelize.STRING,
            allowNull: false
        },
        link_clip: {
            type: Sequelize.STRING,
            allowNull: false
        },
        visites_page: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return Artiste;
}

