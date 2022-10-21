const db = require("../models");
const Categorie_reseau = db.categories_reseaux;
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
    const categorie_reseau = {
        libelle: req.body.libelle,
    };

    // Save Genre in the database
    Categorie_reseau.create(categorie_reseau)
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

    Categorie_reseau.findAll({ where: condition })
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

    Categorie_reseau.findByPk(id)
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

    Categorie_reseau.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
              res.send({
                    message: "Genre was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Genre with id=${id}. Maybe Genre was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Genre with id=" + id
            });
        });
};

// Delete a Genre with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Categorie_reseau.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Genre was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Genre with id=${id}. Maybe Genre was not found!`
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
    Categorie_reseau.destroy({
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
