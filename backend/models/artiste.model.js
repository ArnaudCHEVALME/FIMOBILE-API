module.exports = (sequelize, Sequelize) => {
    return sequelize.define("artiste", {
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
        bannerPath: {
            type: Sequelize.STRING,
            allowNull: false
        },
        linkClip: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nbRecherche: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
}

