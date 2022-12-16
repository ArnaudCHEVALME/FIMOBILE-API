const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    define: {
        timestamps: false
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.artistes = require("./artiste.model.js")(sequelize, Sequelize);
db.categoriesReseaux = require("./categorieReseau.model.js")(sequelize, Sequelize);
db.concerts = require("./concert.model.js")(sequelize, Sequelize);
db.saisons = require("./saison.model.js")(sequelize, Sequelize);
db.ordreCouleurSaison = require("./ordreCouleurSaison.model")(sequelize, Sequelize);
db.couleurs = require("./couleur.model.js")(sequelize, Sequelize);
db.genres = require("./genre.model.js")(sequelize, Sequelize);
db.liensReseaux = require("./lienReseau.model.js")(sequelize, Sequelize);
db.pays = require("./pays.model.js")(sequelize, Sequelize);
db.permissions = require("./permission.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.services = require("./service.model")(sequelize, Sequelize);
db.scenes = require("./scene.model.js")(sequelize, Sequelize);
db.stands = require("./stand.model.js")(sequelize, Sequelize);
db.sousGenres = require("./sousGenre.model")(sequelize, Sequelize);
db.typeStand = require("./typeStand.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.news = require("./news.model.js")(sequelize, Sequelize);


// 1 saison a plusieurs News
// 1 News peut appartenir à plusieurs saisons
db.news.belongsTo(db.saisons, { foreignKey: "saisonId" });
db.saisons.hasMany(db.news, { foreignKey: "saisonId" });

// 1 lienReseau a 1 seul artiste
// 1 artiste a plusieurs liensReseaux
db.liensReseaux.belongsTo(db.artistes, { foreignKey: "artisteId" });
db.artistes.hasMany(db.liensReseaux, { foreignKey: "lienReseauId" });

// 1 saison a plusieurs couleurs
// 1 couleur peut appartenir à plusieurs saisons
db.saisons.belongsToMany(db.couleurs, { through: db.ordreCouleurSaison, foreignKey: "saisonId" });
db.couleurs.belongsToMany(db.saisons, { through: db.ordreCouleurSaison, foreignKey: "couleurId" });

// 1 saison a 1 seul pays à l'honneur
// 1 pays est à l'honneur dans plusieurs saisons
db.saisons.belongsTo(db.pays, { foreignKey: "paysHonneurId" });
db.pays.hasMany(db.saisons, { foreignKey: "paysHonneurId" });

db.artistes.belongsToMany(db.pays, { through: "OriginesArtistes", foreignKey: "artisteId" });
db.pays.belongsToMany(db.artistes, { through: "OriginesArtistes", foreignKey: "paysId" });

// 1 user a 1 seul role
// 1 role est partagé par plusieurs users
db.users.belongsTo(db.roles, { foreignKey: "roleId" });
db.roles.hasMany(db.users, { foreignKey: "roleId" });

// 1 role a plusieurs permissions
// 1 permission est utilisée par plusieurs rôles
db.roles.belongsToMany(db.permissions, { through: "RolesPermissions", foreignKey: "roleId" });
db.permissions.belongsToMany(db.roles, { through: "RolesPermissions", foreignKey: "permissionId" });

//1 stand appartient 1 saison
//1 saison a plusieurs stands
db.stands.belongsTo(db.saisons, { foreignKey: "saisonId" });
db.saisons.hasMany(db.stands, { foreignKey: "saisonId" });

//* ARTISTES *//
// 1 artiste peut avoir n sous-genres
// 1 sous-genre peut être lié à n artistes
db.artistes.belongsToMany(db.sousGenres, { through: "ArtistesSousGenres", foreignKey: "artisteId" });
db.sousGenres.belongsToMany(db.artistes, { through: "ArtistesSousGenres", foreignKey: "sousGenreId" });

// 1 artiste peut avoir n sous-genres
// 1 sous-genre peut être lié à n artistes
db.artistes.belongsToMany(db.genres, { through: "ArtistesGenres", foreignKey: "artisteId" });
db.genres.belongsToMany(db.artistes, { through: "ArtistesGenres", foreignKey: "GenreId" });

// 1 sousGenre a 1 seul genre
// 1 genre a plusieurs sousGenres
db.sousGenres.belongsTo(db.genres, { foreignKey: "genreId" });
db.genres.hasMany(db.sousGenres,{ foreignKey: "genreId" });

// 1 concert a un seul artiste
// 1 artiste participe à plusieurs concerts
db.concerts.belongsTo(db.artistes, { foreignKey: "artisteId" });
db.artistes.hasMany(db.concerts, { foreignKey: "artisteId" });

// 1 concert a une seule scène
// 1 scène appartient à plusieurs concerts
db.concerts.belongsTo(db.scenes, { foreignKey: "sceneId" });
db.scenes.hasMany(db.concerts, { foreignKey: "sceneId" });

// 1 concert appartient à une seule saison
// 1 saison a plusieurs concerts
db.concerts.belongsTo(db.saisons, { foreignKey: "saisonId" });
db.saisons.hasMany(db.concerts, { foreignKey: "saisonId" });

// 1 lien a 1 seule catégorie
// 1 catégorie de lien est utilisée par n liens
db.liensReseaux.belongsTo(db.categoriesReseaux, { foreignKey: "categorieReseauId" });
db.categoriesReseaux.hasMany(db.liensReseaux, { foreignKey: "categorieReseauId" });

// 1 stand a un seul type de stand
// 1 type de stand appartient à plusieurs stands
db.stands.belongsTo(db.typeStand, { foreignKey: "typeStandId" });
db.typeStand.hasMany(db.stands, { foreignKey: "typeStandId" });

// 1 stand a plusieurs services
// 1 service est proposé par plusieurs stands
db.stands.belongsToMany(db.services, { through: "StandsServices", foreignKey: "standId" });
db.services.belongsToMany(db.stands, { through: "StandsServices", foreignKey: "serviceId" });

// 1 stand a plusieurs services
// 1 service est proposé par plusieurs stands
db.artistes.belongsToMany(db.liensReseaux, { through: "LiensArtistes", foreignKey: "ArtisteId" });
db.liensReseaux.belongsToMany(db.artistes, { through: "LiensArtistes", foreignKey: "LienId" });

module.exports = db;