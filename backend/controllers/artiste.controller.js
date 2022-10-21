const db = require("../models");
const genreModel = require("../models/genre.model");
const Artistes = db.artistes;
const Op = db.Sequelize.Op;

// Create and Save new Artistes
exports.create = (req,res) => {
    // Validate request
    if (!req.body.nom){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return 
    }

    // Create a new Artistes
    const artiste = {
        nom: req.body.nom,
        baniere_path: req.body.baniere_path,
        bio: req.body.bio,
        video_link: req.body.video_link,
        visites: req.body.vistes,
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
    const nom = req.query.nom;
    let condition = nom ? { nom: { [Op.iLike]: `%${nom}%` } } : null;

    Genre.findAll({ where: condition })
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