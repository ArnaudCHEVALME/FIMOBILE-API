const db = require("../models");
const Pays = db.pays;
const Saison = db.saisons;
const Stand = db.stands;
const TypeStand = db.typeStand;
const Service = db.services;
const Op = db.Sequelize.Op;

// Create and Save a new Saison
exports.create = async (req, res) => {
    // Create a Saison
    const saison = {
        theme: req.body.theme,
        dateSaison: req.body.dateSaison,
        paysHonneurId: req.body.paysHonneurId,
        bannierePath: req.body.bannierePath
    };

    console.log(saison)

    // Save Saison in the database
    Saison.create(saison)
        .then(data => {
            res.send({
                message: `Saison créée`,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Saison.",
            });
        });
};

// Retrieve all Saison from the database.
exports.findAll = async (req, res) => {
    Saison.findAll()
        .then(data => {
            res.status(200).send({
                message: `Saisons trouvés`,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Saison.",
            });
        });
};

// Find a single Saison with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    Saison.findByPk(id, { include: [Pays, Stand] })
        .then(data => {
            if (data) {
                res.send({
                    message: `Saison trouvé`,
                    data: data
                });
            } else {
                res.status(404).send({
                    message: `Cannot find Saison with id=${id}.`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Saison with id=" + id,
                
            });
        });
};

// Update a Saison by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    const saison = {
        theme: req.body.theme,
        dateSaison: req.body.dateSaison,
    };

    Saison.update(saison, {
        where: { saisonId: id }
    })
        .then(results => {
            if (results[0] > 0) {
                res.status(200).send({
                    message: "Saison was updated successfully.",
                    data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Saison with id=${id}. Maybe Saison was not found or req.body is empty!`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Saison with id=" + id,
                
            });
        });
};

// Delete a Saison with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    Saison.destroy({
        where: { saisonId: id }
    })

        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "Saison was deleted successfully!",

                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Saison with id=${id}. Maybe Saison was not found!`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Saison with id=" + id,
                
            });
        });
};

// Delete all Saison from the database.
exports.deleteAll = async (req, res) => {
    Saison.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Saison were deleted successfully!`,
                data: nums
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Saison.",
                
            });
        });
};
