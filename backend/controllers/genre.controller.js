const db = require("../models");
const { options } = require("pg/lib/defaults");
const Genre = db.genres;
const Op = db.Sequelize.Op;

// Create and Save a new Genre
exports.create = (req, res) => {
    // Validate request
    if (!req.body.libelle) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Genre
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
                message:
                    err.message || "Some error occurred while creating the Genre."
            });
        });
};

// Retrieve all Genres from the database.
exports.findAll = (req, res) => {
    const libelle = req.query.libelle;
    let condition = libelle ? { libelle: { [Op.iLike]: `%${libelle}%` } } : null;

    Genre.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Genres."
            });
        });
};

// Find a single Genre with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Genre.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Genre with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Genre with id=" + id
            });
        });
};

// Update a Genre by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log(id);
    const newValues = { libelle: req.body.libelle };

    Genre.update(newValues, {
        where: {
            genreId: id
        }
    })
        .then(results => {
            if (results[0] > 0) {

                res.status(200).send({
                    message: "Genre mis à jour.", data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Pas de genre avec id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `le serveur a rencontré une erreur pour l'id=${id}\n` + err.message, data: null
            });
        });
};

// Delete a Genre with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Genre.destroy({
        where: { genreId: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "Genre was deleted successfully!",
                    data: null
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Genre with id=${id}. Maybe Genre was not found!`,
                    data: null
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Genre with id=" + id
            });
        });
};

// Delete all Genres from the database.
exports.deleteAll = (req, res) => {
    Genre.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Genres were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Genres."
            });
        });
};
