const db = require("../models");
const { options } = require("pg/lib/defaults");
const Saison = db.saisons;
const News = db.news;
const Op = db.Sequelize.Op;

// Create and Save a new Genre
exports.create = (req, res) => {

    // Create a Genre
    const news = {
        titre: req.body.titre,
        description: req.body.description,
        publishAt: req.body.publishAt,
        saisonId: req.body.saisonId,
    };

    // Save Genre in the database
    News.create(news)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Genre."
            });
        });
};

// Retrieve all Genres from the database.
exports.findAll = (req, res) => {
    const saisonId = req.query.saisonId;
    let condition = saisonId ? { saisonId: { [Op.eq]: saisonId } } : null;

    News.findAll({ where: condition, include: Saison })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving News."
            });
        });
};

// Find a single Genre with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    News.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find News with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving News with id=" + id
            });
        });
};

// Update a Genre by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log(id);
    const newValues =
    {
        titre: req.body.titre,
        description: req.body.description,
        publishAt: req.body.publishAt,
    };

    News.update(newValues, {
        where: {
            newsId: id
        }
    })
        .then(results => {
            if (results[0] > 0) {

                res.status(200).send({
                    message: "News mis à jour.", data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Pas de news avec id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `le serveur a rencontré une erreur pour l'id=${id}\n` + err.message, data: null
            });
        });
};

// Delete a Genre with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    News.destroy({
        where: { newsId: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "News was deleted successfully!",
                    data: null
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete News with id=${id}. Maybe News was not found!`,
                    data: null
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete News with id=" + id
            });
        });
};

// Delete all Genres from the database.
exports.deleteAll = (req, res) => {
    News.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} News were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all News."
            });
        });
};
