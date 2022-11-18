const db = require("../models");
const Permission = db.permission;
const Op = db.Sequelize.Op;

// Create and Save a new Permission
exports.create = (req, res) => {
    // Validate request
    if (!req.body.libelle) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Permission
    const permission = {
        libelle: req.body.libelle,
    };

    // Save Permission in the database
    Permission.create(permission)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Permission."
            });
        });
};

// Retrieve all Permissions from the database.
exports.findAll = (req, res) => {
    const libelle = req.query.libelle;
    let condition = libelle ? { libelle: { [Op.iLike]: `%${libelle}%` } } : null;

    Permission.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Permissions."
            });
        });
};

// Find a single Permission with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Permission.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Permission with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Permission with id=" + id
            });
        });
};

// Update a Permission by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Permission.update(req.body, {
        where: { id: id }
    })
        .then(results => {
            if (results[0] > 0) {

                res.status(200).send({
                    message: "Permission was updated successfully.", data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Permission with id=${id}. Maybe Permission was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Permission with id=" + id
            });
        });
};

// Delete a Permission with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Permission.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Permission was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Permission with id=${id}. Maybe Permission was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Permission with id=" + id
            });
        });
};

// Delete all Permissions from the database.
exports.deleteAll = (req, res) => {
    Permission.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Permissions were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Permissions."
            });
        });
};
