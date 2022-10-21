const db = require("../models");
const Type_poi = db.type_poi;
const Op = db.Sequelize.Op;

// Create and Save a new Poi type
exports.create = (req, res) => {
    // Validate request
    if (!req.body.libelle) {
        res.status(400).send({
            message: "Libelle can not be empty!"
        });
        return;
    }

    // Create a Poi type
    const type_poi = {
        libelle: req.body.libelle,
    };

    // Save Poi type in the database
    Type_poi.create(type_poi)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the poi type."
            });
        });
};

// Retrieve all Poi types from the database.
exports.findAll = (req, res) => {
    const libelle = req.query.libelle;
    let condition = libelle ? { libelle: { [Op.iLike]: `%${libelle}%` } } : null;

    Type_poi.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving poi types."
            });
        });
};

// Find a single Poi type with an id
exports.findOne = (req, res) => {
    const id = req.params.id;


    Type_poi.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find poi types with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Genre with id=" + id
            });
        });
};

// Update a Poi type by the id in the request
exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    const newValues = { libelle: req.body.libelle};


    Type_poi.update(newValues, {
        where: { type_poiId: id }
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

// Delete a Poi type with the specified id in the request
exports.delete = (req, res) => {
    const id = parseInt(req.params.id);

    Type_poi.destroy({
        where: { type_poiId: id }
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

// Delete all Poi types from the database.
exports.deleteAll = (req, res) => {
    Type_poi.destroy({
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
