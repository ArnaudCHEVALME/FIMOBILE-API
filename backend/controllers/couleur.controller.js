const db = require("../models");
const Couleur = db.couleurs;
const Op = db.Sequelize.Op;

// Create and Save a new Couleur
exports.create = (req, res) => {
    // Create a Couleur
    const couleur = {
        valeurHexa: req.body.valeurHexa
    };

    // Save Couleur in the database
    Couleur.create(couleur)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Couleur."
            });
        });
};

// Retrieve all Couleur from the database.
exports.findAll = (req, res) => {

    Couleur.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Couleur."
            });
        });
};

// Find a single Couleur with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Couleur.findByPk(id)
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
                message: "Error retrieving Couleur with id=" + id
            });
        });
};

// Update a Couleur by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    let newCouleur = {
        valeurHexa: req.body.valeurhexa
    };

    Couleur.update(newCouleur, { where: { couleurId: id } })
        .then(results => {
            if (results[0] > 0) {
                res.status(200).send({
                    message: "Couleur was updated successfully.", data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Pas de couleurs avec id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Couleur with id=" + id
            });
        });
};

// Delete a Couleur with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Couleur.destroy({
        where: { couleurId: id }
    })

        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "Couleur supprimée",
                    data: null
                });
            } else {
                res.status(404).send({
                    message: `Pas de couleur avec id=${id}`,
                    data: null
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Couleur with id=" + id,
                data: null
            });
        });
};

// Delete all Couleur from the database.
exports.deleteAll = (req, res) => {
    Couleur.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Couleurs were deleted successfully!`,
                data: null
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Couleur.",
                data: null
            });
        });
};
