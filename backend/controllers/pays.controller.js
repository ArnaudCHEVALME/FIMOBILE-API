const db = require("../models");
const Pays = db.Pays;
const Op = db.Sequelize.Op;

// Create and Save a new Pays
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nompays) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Pays
    const pays = {
        nompays: req.body.nompays,
    };

    // Save Pays in the database
    Pays.create(pays)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pays."
            });
        });
};

// Retrieve all Pays from the database.
exports.findAll = (req, res) => {
    const nompays = req.query.nompays;
    let condition = nompays ? { nompays: { [Op.iLike]: `%${nompays}%` } } : null;

    Pays.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Pays."
            });
        });
};

// Find a single Pays with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pays.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Pays with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pays with id=" + id
            });
        });
};

// Update a Pays by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Pays.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pays was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pays with id=${id}. Maybe Pays was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pays with id=" + id
            });
        });
};

// Delete a Pays with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Pays.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pays was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pays with id=${id}. Maybe Pays was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pays with id=" + id
            });
        });
};

// Delete all Pays from the database.
exports.deleteAll = (req, res) => {
    Pays.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Pays were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Pays."
            });
        });
};
