const db = require("../models");
const {where} = require("sequelize");
const sequelize = db.sequelize;
const Genre = db.genres;
const SousGenre = db.sousGenres;
const Artiste = db.artistes;
const Op = db.Sequelize.Op;

// Create and Save a new Genre
exports.create = async (req, res) => {
    const genre = {
        libelle: req.body.libelle,
    };

    // Save Genre in the database
    Genre.create(genre)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "données incorrectes : " + err.message,
                data: null
            });
        });
};

// Retrieve all Genres from the database.
exports.findAll = async (req, res) => {
    const saisonId = req.body.saisonId;

    let sql = "SELECT * FROM genres";
    let genres;
    try {
        if (saisonId) {
            sql += " JOIN \"sousGenres\" sG on genres.\"genreId\" = sG.\"genreId\"" +
            "JOIN \"ArtistesSousGenres\" ASG on sG.\"sousGenreId\" = ASG.\"sousGenreId\"" +
            "JOIN artistes a on ASG.\"artisteId\" = a.\"artisteId\"" +
            "JOIN concerts c on a.\"artisteId\" = c.\"artisteId\"" +
            "WHERE c.\"saisonId\" = $1;";
            genres = await sequelize.query(sql, {bind: [saisonId], type: sequelize.QueryTypes.SELECT});
        } else {
            genres = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
        }
        res.send(genres);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: `Le serveur a rencontré une erreur.\n` + e.message,
            data: null
        });
    }
};

// Find a single Genre with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    Genre.findByPk(id, {include:SousGenre})
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Pas de Genre avec id=${id}.`,
                    data: null
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Le serveur a rencontré une erreur pour l'id=${id}.\n` + err.message,
                data: null
            });
        });
};

// Update a Genre by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    const newValues = { libelle: req.body.libelle };

    Genre.update(newValues, {
        where: {
            genreId: id
        }
    })
        .then(data => {
            if (data[0] > 0) {
                res.status(200).send({
                    message: "Genre mis à jour.", data: data[1]
                });
            } else {
                res.send.status(404)({
                    message: `Pas de genre avec id=${id}.`, data: null
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Le serveur a rencontré une erreur pour l'id=${id}.\n` + err.message, data: null
            });
        });
};

// Delete a Genre with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    Genre.destroy({
        where: { genreId: id }
    })
        .then(num => {
            if (num === 1) {
                res.status(200).send({
                    message: "Genre a bien été supprimé."
                });
            } else {
                res.send.status(404)({
                    message: `Pas de genre avec id=${id}.`, data: null
                });
            }
        })
        .catch(err => {
            res.status(500).send({});
        });
};

// Delete all Genres from the database.
exports.deleteAll = async (req, res) => {
    Genre.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send.status(200)({
                message: `${nums} Genres ont bien été supprimés.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: `Le serveur a rencontré une erreur pour l'id=${id}.\n` + err.message, data: null
            });
        });
};
