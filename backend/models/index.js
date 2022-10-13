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
// db.pois = require("./poi.model.js")(sequelize, Sequelize);
// db.scenes = require("./scene.model.js")(sequelize, Sequelize);
// db.services = require("./service.model")(sequelize, Sequelize);
db.sous_genres = require("./sous_genre.model")(sequelize, Sequelize);
// db.users = require("./user.model.js")(sequelize, Sequelize);

db.genres.hasMany(db.artistes);
db.artistes.belongsTo(db.genres);

db.artistes.belongsToMany(db.sous_genres, { through: "ArtistesSousGenres" });
db.sous_genres.belongsToMany(db.artistes, { through: "ArtistesSousGenres" });



module.exports = db;


