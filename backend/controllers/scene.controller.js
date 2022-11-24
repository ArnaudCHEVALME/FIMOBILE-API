const db = require("../models");
const Scene = db.scenes;
const Op = db.Sequelize.Op;

// Create and Save a new scene type
exports.create = (req, res) => {
    // Create a Scene
    const scene = {
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        nom: req.body.nom,
        capacite: 0,
        interieur: req.body.interieur
    };

    // Save Scene in the database
    Scene.create(scene)
        .then(data => {
            res.send({
                message: `Scene créée`,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Scene.",
                
            });
        });
};

// Retrieve all scene from the database. -> still in progress
exports.findAll = (req, res) => {
    const longitude = req.query.longitude;
    const latitude = req.query.latitude;
    const nom = req.query.nom;
    const visites = req.query.visites;


    let condition_longitude = longitude ? { longitude: { [Op.iLike]: longitude } } : null;


    Scene.findAll()
        .then(data => {
            res.send({
                message: `Scenes trouvés`,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Scenes.",
                
            });
        });
};

// Find a single Scene with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Scene.findByPk(id)
        .then(data => {
            if (data) {
                res.send({
                    message: `Sscene trouvé`,
                    data: data
                });
            } else {
                res.status(404).send({
                    message: `Cannot find Scene with id=${id}.`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Scene with id=" + id,
                
            });
        });
};

// Update a Scene by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Scene.update(req.body, {
        where: { sceneId: id }
    })
        .then(results => {
            if (results[0] > 0) {
                res.status(200).send({
                    message: "Scene was updated successfully.",
                    data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Scene with id=${id}. Maybe Scene was not found or req.body is empty!`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Scene with id=" + id,
                
            });
        });
};

// Delete a Scene with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Scene.destroy({
        where: { sceneId: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "Scene was deleted successfully!",
                    
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Scene with id=${id}. Maybe Scene was not found!`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Scene with id=" + id,
                
            });
        });
};

// Delete all Scene from the database.
exports.deleteAll = (req, res) => {
    Scene.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Scenes were deleted successfully!`,
                data: nums
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Scenes.",
                
            });
        });
};
