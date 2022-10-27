const db = require("../models");
const Reseau = db.reseaux;
const Op = db.Sequelize.Op;

// Create and Save a new Reseau
exports.create = (req, res) => {
    // Validate request
    if (!req.body.lien) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Reseau
    const reseau = {
        lien: req.body.lien,
    };

    // Save Reseau in the database
    Reseau.create(reseau)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Reseau."
            });
        });
};

// Retrieve all Reseaux from the database.
exports.findAll = (req, res) => {
    const lien = req.query.lien;
    let condition = lien ? { lien: { [Op.iLike]: `%${lien}%` } } : null;

    Reseau.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Reseaux."
            });
        });
};

// Find a single Reseau with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Reseau.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Reseau with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Reseau with id=" + id
            });
        });
};

// Update a Reseau by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log(id);
    const newValues = { lien: req.body.lien };

    Reseau.update(newValues, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Reseau was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Reseau with id=${id}. Maybe Reseau was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Reseau with id=" + id
            });
        });
};

// Delete a Reseau with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Reseau.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Reseau was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Reseau with id=${id}. Maybe Reseau was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Reseau with id=" + id
            });
        });
};

// Delete all Reseaux from the database.
exports.deleteAll = (req, res) => {
    Reseau.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Reseaux were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Reseaux."
            });
        });
};
