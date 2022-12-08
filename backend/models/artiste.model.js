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
        bannerPath: {
            type: Sequelize.STRING,
            allowNull: false
        },
        linkClip: {
            type: Sequelize.STRING,
            allowNull: false
        },
        visitesPage: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return Artiste;
}

