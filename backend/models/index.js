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

db.artistes = require("./artiste.model")(sequelize, Sequelize);
db.genres = require("./genre.model.js")(sequelize, Sequelize);
db.stands = require("./stand.model.js")(sequelize, Sequelize);
db.scenes = require("./scene.model.js")(sequelize, Sequelize);
db.services = require("./service.model")(sequelize, Sequelize);
db.typeStand = require("./typeStand.model.js")(sequelize, Sequelize);
db.stand = require("./stand.model.js")(sequelize, Sequelize);
db.sousGenres = require("./sousGenre.model")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.concerts = require("./concert.model.js")(sequelize, Sequelize);
db.categoriesReseaux = require("./categorieReseau.model.js")(sequelize, Sequelize);
db.reseaux = require("./reseau.model.js")(sequelize, Sequelize);
db.saison = require("./saison.model.js")(sequelize, Sequelize);
db.pays = require("./pays.model.js")(sequelize, Sequelize);
db.couleurs = require("./couleur.model.js")(sequelize, Sequelize);

//1 stand appartient 1 saison
//1 saison a n stands
db.stands.belongsTo(db.saison, { foreignKey: "saisonId" });
db.saison.hasMany(db.stands, { foreignKey: "standId" });

// 1 artiste a 1 genre
// 1 genre appartient à n artistes
db.artistes.belongsTo(db.genres);
db.genres.hasMany(db.artistes);

// 1 artiste peut avoir n sous-genres
// 1 sous-genre peut être lié à n artistes
db.artistes.belongsToMany(db.sousGenres, { through: "ArtistesSousGenres" });
db.sousGenres.belongsToMany(db.artistes, { through: "ArtistesSousGenres" });

db.artistes.belongsToMany(db.scenes, { through: db.concerts });
db.scenes.belongsToMany(db.artistes, { through: db.concerts });

// 1 Reseau a 1 CategorieReseau
// 1 CategorieReseau appartient à n Reseaux
db.reseaux.belongsTo(db.categoriesReseaux, { foreignKey: "categorieReseauId" });
db.categoriesReseaux.hasMany(db.reseaux, { foreignKey: "reseauId" });

// 1 artiste a 1 genre
// 1 genre appartient à n artistes
db.stand.belongsTo(db.typeStand, { foreignKey: "typeStandId" });
db.typeStand.hasMany(db.stand, { foreignKey: "standId" });

module.exports = db;


