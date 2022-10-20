const db = require("../models");
const Concert = db.concerts;
const Op = db.Sequelize.Op;

// Create and Save a new Concert
exports.create = (req, res) => {
    // Validate request data with validator
    if (!req.body.libelle) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Concert
    const concert = {
        libelle: req.body.debut,
    };

    // Save Concert in the database
    Concert.create(concert)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Concert."
            });
        });
};

// Retrieve all Concerts from the database.
exports.findAll = (req, res) => {
    const jour = req.query.jour;
    let condition = libelle ? { libelle: { [Op.iLike]: `%${libelle}%` } } : null;

    Concert.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Concerts."
            });
        });
};

// Find a single Concert with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Concert.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Concert with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Concert with id=" + id
            });
        });
};

// Update a Concert by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Concert.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Concert was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Concert with id=${id}. Maybe Concert was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Concert with id=" + id
            });
        });
};

// Delete a Concert with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Concert.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Concert was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Concert with id=${id}. Maybe Concert was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Concert with id=" + id
            });
        });
};

// Delete all Concerts from the database.
exports.deleteAll = (req, res) => {
    Concert.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Concerts were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Concerts."
            });
        });
};
