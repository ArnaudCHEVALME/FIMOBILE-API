const db = require("../models");
const Poi = db.poi;
const Op = db.Sequelize.Op;

// Create and Save a new Poi type
exports.create = (req, res) => {
    // Validate request
    if (!req.body.latitude) {
        res.status(400).send({
            message: "Latitude cannot be empty!"
        });
        return;
    }
    if (!req.body.longitude) {
        res.status(400).send({
            message: "Longitude cannot be empty!"
        });
        return;
    }
    if (!req.body.nom) {
        req.body.nom = "";
    }
    if (!req.body.visites) {
        req.body.visites = 0;
    }

    // Create a Poi
    const poi = {
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        nom: req.body.nom,
        visites: req.body.visites
    };

    // Save Poi in the database
    Poi.create(poi)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Poi."
            });
        });
};
 
// Retrieve all Pois from the database.-> still in progress
exports.findAll = (req, res) => {
    const longitude = req.query.longitude;
    const latitude = req.query.latitude;
    const nom = req.query.nom;
    const visites = req.query.visites;


    let condition_longitude = longitude ? { longitude: { [Op.iLike]: longitude } } : null;


    Poi.findAll({ where: condition_longitude })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Pois."
            });
        });
};

// Find a single Poi with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Poi.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Poi with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Poi with id=" + id
            });
        });
};

// Update a Poi by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Poi.update(req.body, {
        where: { poiId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Poi was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Poi with id=${id}. Maybe Poi was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Poi with id=" + id
            });
        });
};

// Delete a Poi with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Poi.destroy({
        where: { poiId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Poi was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Poi with id=${id}. Maybe Poi was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Poi with id=" + id
            });
        });
};

// Delete all Poi from the database.
exports.deleteAll = (req, res) => {
    Poi.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Pois were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Pois."
            });
        });
};
