const db = require("../models");
const Artiste = db.artistes;
const Op = db.Sequelize.Op;

// Create and Save new Artiste
exports.create = (req,res) => {
    // Validate request
    if (!req.body.name){
        res.status(400).send({
            message: "Le contenu ne peut pas être vide!"
        });
        return 
    }

    // Create a new Artiste
    const artiste = {
        name: req.body.name,
        bio: req.body.bio,
        bannerPath: req.body.bannerPath,
        linkClip: req.body.linkClip,
        visitesPage: req.body.visitesPage,
    };

    // Save Artiste in the database
    Artiste.create(artiste)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Le serveur a rencontré une erreur pour l'id=${id}.\n`+err.message, data:null
            });
        });
};

// Retrieve all Artiste from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Artiste.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Le serveur a rencontré une erreur pour l'id=${id}.\n`+err.message, data:null
            });
        });
};

// Find a single Artiste with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Artiste.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Pas de genre avec id=${id}.`, data:null
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Le serveur a rencontré une erreur pour l'id=${id}.\n`+err.message, data:null
            });
        });
};


// Update an Artiste by the id in the request
exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const newValues = {
        name: req.body.name,
        bio: req.body.bio,
        banierePath: req.body.banierePath,
        linkClip: req.body.linkClip,
    };

    Artiste.update(newValues, {
        where: {
            artiste: id
        }
    })
        .then(data => {
            if (data[0] > 0) {
                res.status(200).send({
                    message: "Artiste mis à jour.", data:data[1]
                });
            } else {
                res.send.status(404)({
                    message: `Pas de genre avec id=${id}.`, data:null
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Le serveur a rencontré une erreur pour l'id=${id}.\n`+err.message, data:null
            });
        });
};


// Delete an Artiste with the specified id in the request
exports.delete = (req, res) => {
    const id = parseInt(req.params.id);

    Artiste.destroy({
        where: { artisteId : id }
    })
        .then(num => {
            if (num === 1) {
                res.status(200).send({
                    message: "Artiste a bien été supprimé."
                });
            } else {
                res.send.status(404)({
                    message: `Pas d'artiste avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Le serveur a rencontré une erreur pour l'id=${id}.\n` + err.message, data: null
            });
        });
};

// Delete all Artiste from the database.
exports.deleteAll = (req, res) => {
    Artiste.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.status(200).send({
                message: `${nums} Artistes ont bien été supprimé.` });
        })
        .catch(err => {
            res.status(500).send({
                message: `Le serveur a rencontré une erreur pour l'id=${id}.\n` + err.message, data: null
            });
        });
};