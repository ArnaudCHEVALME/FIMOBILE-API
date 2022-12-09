const db = require("../models");
const SousGenre = db.sousGenres;
const Genre = db.genres;
const Op = db.Sequelize.Op;

// Create and Save a new Subgenre
exports.create = (req, res) => {
    // Create a SubGenre
    const sousGenre = {
        libelle: req.body.libelle
    };

    // Save Subgenre in the database
    SousGenre.create(sousGenre)
        .then(data => {
            data.setGenre(eval(req.body.genreId))
                .then(data => {
                    res.status(200).send(data)
                }).catch(err => {
                res.send(err)
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the subgenre."
            });
        });
};

// Retrieve all subgenres from the database.
exports.findAll = (req, res) => {
    const libelle = req.query.libelle;
    const genreId = req.query.genreId;
    let condition = libelle ? { libelle: { [Op.iLike]: `%${libelle}%` } } : null;

    SousGenre.findAll({ where: condition , include: Genre})
        .then(data => {
            res.send({
                message: null,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Subgenres."
            });
        });
};

// Find a single subgenre with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    SousGenre.findByPk(id, {include: Genre})
        .then(data => {
            if (data) {
                res.send({
                    message: null, data: data
                })
            } else {
                res.status(404).send({
                    message: `Cannot find subgenre with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving subgenre with id=" + id
            });
        });
};

// Update a subgenre by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log(id);
    const newValues = { libelle: req.body.libelle, genreId: req.body.genreId };

    SousGenre.update(newValues, {
        where: { sousGenreId: id }
    })
        .then(results => {
            if (results[0] > 0) {

                res.status(200).send({
                    message: "Subgenre was updated successfully.", data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Cannot update subgenre with id=${id}. Maybe Genre was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Subgenre with id=" + id
            });
        });
};

// Delete a Genre with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    SousGenre.destroy({
        where: { sousGenreId: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "Subgenre was deleted successfully!",
                    
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Subgenre with id=${id}. Maybe SubGenre was not found!`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Subgenre with id=" + id
            });
        });
};

// Delete all Subgenres from the database.
exports.deleteAll = (req, res) => {
    SousGenre.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Subgenre were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Subgenres."
            });
        });
};
