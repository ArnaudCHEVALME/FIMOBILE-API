const db = require("../models");
const Concert = db.concerts;
const Op = db.Sequelize.Op;
const Scene = db.scenes;
const Artiste = db.artistes;
const Saison = db.saisons;


// Create and Save a new Concert
exports.create = (req, res) => {
    // Validate request data with validator
    if (!req.body.debut) {
        res.status(400).send({
            message: "Debut can not be empty!"
        });
        return;
    }
    if (!req.body.duree) {
        res.status(400).send({
            message: "Duree can not be empty!"
        });
        return;
    }
    if (!req.body.nbPersonne) {
        req.body.nbPersonne = 0;
    }
    if (!req.body.visites) {
        req.body.visites = 0;
    }
    if (!req.body.sceneId) {
        res.status(400).send({
            message: "Scene can not be empty!"
        });
        return;
    }
    if (!req.body.artisteId) {
        res.status(400).send({
            message: "Artiste can not be empty!"
        });
        return;
    }

    // Create a Concert
    const concert = {
        debut: new Date(req.body.debut),
        duree: req.body.duree,
        nbPersonne: req.body.nbPersonne,
        visites: req.body.visites,
        sceneId: req.body.sceneId,
        artisteId: req.body.artisteId
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

// Retrieve all Concerts from the database. => WIP maybe middleware
exports.findAllPublished = (req, res) => {
    Concert.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Concerts."
            });
        });
}
exports.findAll = (req, res) => {
    const debut = req.query.debut;
    const duree = req.query.duree;
    const sceneId = req.query.sceneId;
    const artisteId = req.query.artisteId;

    let conditionDebut = debut ? { debut: { [Op.iLike]: `%${debut}%` } } : null;
    let conditionDuree = duree ? { duree: { [Op.iLike]: `%${duree}%` } } : null;
    let conditionSceneId = sceneId ? { sceneId: { [Op.eq]: `%${sceneId}%` } } : null;
    let conditionArtisteId = artisteId ? { artisteId: { [Op.eq]: `%${artisteId}%` } } : null;


    Concert.findAll({
        where: {
            debut: conditionDebut,
            duree: conditionDuree,
            sceneId: conditionSceneId,
            artisteId: conditionArtisteId
        }
    })
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
    const id = req.params.concertId;

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
    const id = req.params.concertId;

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
