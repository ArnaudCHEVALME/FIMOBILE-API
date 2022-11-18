const db = require("../models");
const Artistes = db.artistes;
const Op = db.Sequelize.Op;

// Create and Save new Artistes
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }

    // Create a new Artistes
    const artiste = {
        name: req.body.name,
        bio: req.body.bio,
        banierrePath: req.body.banierePath,
        linkClip: req.body.linkClip,
        visitesPage: req.body.visitesPage,
    };

    // Save Artiste in the database
    Artistes.create(artiste)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Artiste."
            });
        });
};

// Retrieve all Artistes from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Artistes.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Artistes."
            });
        });
};

// Find a single Artiste with an id
exports.findOne = (req, res) => {
    const id = req.params.artisteId;

    Artistes.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Artiste with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Artiste with id=" + id
            });
        });
};


// Update an Artiste by the id in the request
exports.update = (req, res) => {
    const id = parseInt(req.params.artisteId);
    const newValues = {
        name: req.body.name,
        bio: req.body.bio,
        banierePath: req.body.banierePath,
        linkClip: req.body.linkClip,
    };

    Artistes.update(newValues, {
        where: { artiste: id }
    })
        .then(results => {
            if (results[0] > 0) {

                res.status(200).send({
                    message: "Artiste was updated successfully.", data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Artiste with id=${id}. Maybe Artiste was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Artiste with id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = parseInt(req.params.artisteId);

    Artistes.destroy({
        where: { artisteId: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "Artiste was deleted successfully!",
                    data: null
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Artiste with id=${id}. Maybe Artiste was not found!`,
                    data: null
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Artiste with id=" + id
            });
        });
};

// Delete all Artistes from the database.
exports.deleteAll = (req, res) => {
    Artistes.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Artiste were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Artiste."
            });
        });
};