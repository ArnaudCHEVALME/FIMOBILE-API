const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

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
db.type_stand = require("./type_stand.model.js")(sequelize, Sequelize);
db.stand = require("./stand.model.js")(sequelize, Sequelize);
db.sous_genres = require("./sous_genre.model")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.concerts = require("./concert.model.js")(sequelize, Sequelize);
db.categories_reseaux = require("./categorie_reseau.model.js")(sequelize, Sequelize);
db.reseaux = require("./reseau.model.js")(sequelize, Sequelize);
db.saison = require("./saison.model.js")(sequelize, Sequelize);//FIXME

//1 stand appartient 1 saison
//1 saison a n stands
db.stands.belongsTo(db.saison, {foreignKey: "saisonId"});
db.saison.hasMany(db.stands, {foreignKey: "standId"});

// 1 artiste a 1 genre
// 1 genre appartient à n artistes
db.artistes.belongsTo(db.genres);
db.genres.hasMany(db.artistes);

// 1 artiste peut avoir n sous-genres
// 1 sous-genre peut être lié à n artistes
db.artistes.belongsToMany(db.sous_genres, { through: "ArtistesSousGenres" });
db.sous_genres.belongsToMany(db.artistes, { through: "ArtistesSousGenres" });

db.artistes.belongsToMany(db.scenes, { through: db.concerts });
db.scenes.belongsToMany(db.artistes, { through: db.concerts });

// 1 Reseau a 1 Categorie_reseau
// 1 Categorie_reseau appartient à n Reseaux
db.reseaux.belongsTo(db.categories_reseaux);
db.categories_reseaux.hasMany(db.reseaux);

module.exports = db;


