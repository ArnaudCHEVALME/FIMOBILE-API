const db = require("../models");
const Couleurs = db.couleurs;
const Op = db.Sequelize.Op;

// Create and Save a new Couleurs
exports.create = (req, res) => {
    // Validate request
    if (!req.body.valeurhexa1 || !req.body.valeurhexa2) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Couleurs
    const couleurs = {
        valeurhexa1: req.body.valeurhexa1,
        valeurhexa2: req.body.valeurhexa2
    };

    // Save Couleurs in the database
    Couleurs.create(couleurs)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Couleurs."
            });
        });
};

// Retrieve all Couleurs from the database.
exports.findAll = (req, res) => {
    const valeurhexa1 = req.query.valeurhexa1;

    let condition = valeurhexa1 ? { valeurhexa1: { [Op.iLike]: `%${valeurhexa1}%` } } : null;

    Couleurs.findAll({ where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Couleurs."
            });
        });
};

// Find a single Couleurs with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Couleurs.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Couleurs with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Couleurs with id=" + id
            });
        });
};

// Update a Couleurs by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    const newCouleurs = {
        valeurhexa1: req.body.valeurhexa1,
        valeurhexa2: req.body.valeurhexa2
    };

    Couleurs.update(newCouleurs, {
        where: { couleurId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Couleurs was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Couleurs with id=${id}. Maybe Couleurs was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Couleurs with id=" + id
            });
        });
};

// Delete a Couleurs with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Couleurs.destroy({
        where: { couleurId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Couleurs was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Couleurs with id=${id}. Maybe Couleurs was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Couleurs with id=" + id
            });
        });
};

// Delete all Couleurs from the database.
exports.deleteAll = (req, res) => {
    Couleurs.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Couleurs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Couleurs."
            });
        });
};
