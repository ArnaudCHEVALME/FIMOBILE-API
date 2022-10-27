const db = require("../models");
const Type_stand = db.type_stand;
const Op = db.Sequelize.Op;

// Create and Save a new Stand type
exports.create = (req, res) => {
    // Validate request
    if (!req.body.libelle) {
        res.status(400).send({
            message: "Libelle can not be empty!"
        });
        return;
    }

    // Create a Stand type
    const type_stand = {
        libelle: req.body.libelle,
    };

    // Save Stand type in the database
    Type_stand.create(type_stand)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the stand type."
            });
        });
};

// Retrieve all Stand types from the database.
exports.findAll = (req, res) => {
    const libelle = req.query.libelle;
    let condition = libelle ? { libelle: { [Op.iLike]: `%${libelle}%` } } : null;

    Type_stand.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving stand types."
            });
        });
};

// Find a single Stand type with an id
exports.findOne = (req, res) => {
    const id = req.params.id;


    Type_stand.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find stand types with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Genre with id=" + id
            });
        });
};

// Update a Stand type by the id in the request
exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    const newValues = { libelle: req.body.libelle };


    Type_stand.update(newValues, {
        where: { type_standId: id }
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

// Delete a Stand type with the specified id in the request
exports.delete = (req, res) => {
    const id = parseInt(req.params.id);

    Type_stand.destroy({
        where: { type_standId: id }
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

// Delete all Stand types from the database.
exports.deleteAll = (req, res) => {
    Type_stand.destroy({
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
