const db = require("../models");
const Service = db.services;
const Op = db.Sequelize.Op;

// Create and Save a new Service
exports.create = async (req, res) => {
    // Create a Service
    const service = {
        libelle: req.body.libelle
    };

    // Save Service in the database
    Service.create(service)
        .then(data => {
            res.send({
                message: `Service créé`,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Service.",
                
            });
        });
};

// Retrieve all Services from the database.
exports.findAll = async (req, res) => {
    const libelle = req.query.libelle;
    let condition = libelle ? { libelle: { [Op.iLike]: `%${libelle}%` } } : null;

    Service.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Services.",
            });
        });
};

// Find a single Service with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    Service.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Service with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Service with id=" + id
            });
        });
};

// Update a Service by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    const newValues = { libelle: req.body.libelle };

    Service.update(newValues, {
        where: { serviceId: id }
    })
        .then(results => {
            if (results[0] > 0) {

                res.status(200).send({
                    message: "Service was updated successfully.", data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Service with id=" + id
            });
        });
};

// Delete a Service with the specified id in the request
exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);

    Service.destroy({
        where: { serviceId: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "Service was deleted successfully!",
                    
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Service with id=${id}. Maybe Service was not found!`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Service with id=" + id
            });
        });
};

// Delete all Services from the database.
exports.deleteAll = async (req, res) => {
    Service.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Services were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Services."
            });
        });
};
