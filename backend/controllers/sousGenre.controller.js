const db = require("../models");
const SousGenre = db.sousGenres;
const Genre = db.genres;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

// Create and Save a new Subgenre
exports.create = async (req, res) => {
    // Create a SubGenre
    const sousGenre = {
        libelle: req.body.libelle
    };

    // Save Subgenre in the database
    SousGenre.create(sousGenre)
        .then(data => {
            data.setGenre(eval(req.body.genreId))
                .then(data => {
                    res.status(200).send(data)
                }).catch(err => {
                    SousGenre.destroy(data);
                res.send(err)
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the subgenre."
            });
        });
};

// Retrieve all subgenres from the database.
exports.findAll = async (req, res) => {
    const saisonId = req.query.saisonId ? req.query.saisonId : null;

    let sql = "SELECT * FROM \"sousGenres\""
    let sousGenres;
    try{
        if (saisonId){
            sql+= "JOIN \"ArtistesSousGenres\" s on sousGenres.\"sousGenreId\" = s.\"sousGenreId\" "+
                "JOIN artistes a on s.\"sousGenreId\" = a.\"sousGenreId\" " +
                "JOIN concerts c  on a.\"artisteId\" = c.\"artisteId\" " +
                "WHERE c.\"saisonId\" = $1"
            sousGenres = await sequelize.query(sql, {bind: [saisonId], type: sequelize.QueryTypes.SELECT})
        } else {
            sousGenres = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
        }
        res.send(sousGenres);
    } catch (e) {
        console.error(e)
        res.status(500).send({
            message: `Le serveur a rencontré une erreur. \n` +e.message,
            data: null
        });
    }
};

// Find a single subgenre with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    SousGenre.findByPk(id, {include: Genre})
        .then(data => {
            if (data) {
                res.send({
                    message: null, data: data
                })
            } else {
                res.status(404).send({
                    message: `Cannot find subgenre with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving subgenre with id=" + id
            });
        });
};

// Update a subgenre by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const newValues = { libelle: req.body.libelle, genreId: req.body.genreId };

    SousGenre.update(newValues, {
        where: { sousGenreId: id }
    })
        .then(results => {
            if (results[0] > 0) {

                res.status(200).send({
                    message: "Subgenre was updated successfully.", data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Cannot update subgenre with id=${id}. Maybe Genre was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Subgenre with id=" + id
            });
        });
};

// Delete a Genre with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    SousGenre.destroy({
        where: { sousGenreId: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "Subgenre was deleted successfully!",
                    
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Subgenre with id=${id}. Maybe SubGenre was not found!`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Subgenre with id=" + id
            });
        });
};

// Delete all Subgenres from the database.
exports.deleteAll = async (req, res) => {
    SousGenre.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Subgenre were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Subgenres."
            });
        });
};
