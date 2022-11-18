const db = require("../models");
const Saison = db.saisons;
const Op = db.Sequelize.Op;

// Create and Save a new Saison
exports.create = (req, res) => {
    // Validate request
    if (!req.body.theme) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Saison
    const saison = {
        theme: req.body.theme,
        dateSaison: req.body.dateSaison,
        paysHonneurId: req.body.paysHonneurId
    };

    // Save Saison in the database
    Saison.create(saison)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Saison."
            });
        });
};

// Retrieve all Saison from the database.
exports.findAll = (req, res) => {
    const theme = req.query.theme;
    let condition = theme ? { theme: { [Op.iLike]: `%${theme}%` } } : null;

    Saison.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Saison."
            });
        });
};

// Find a single Saison with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Saison.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Saison with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Saison with id=" + id
            });
        });
};

// Update a Saison by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    const saison = {
        theme: req.body.theme,
        dateSaison: req.body.dateSaison,
    };

    Saison.update(saison, {
        where: { IdSaison: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Saison was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Saison with id=${id}. Maybe Saison was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Saison with id=" + id
            });
        });
};

// Delete a Saison with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Saison.destroy({
        where: { IdSaison: id }
    })
        .then(results => {
            if (results[0] > 0) {

                res.status(200).send({
                    message: "Saison was deleted successfully!", data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Saison with id=${id}. Maybe Saison was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Saison with id=" + id
            });
        });
};

// Delete all Saison from the database.
exports.deleteAll = (req, res) => {
    Saison.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Saison were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Saison."
            });
        });
};
