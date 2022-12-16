const db = require("../models");
const Couleur = db.couleurs;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new Couleur
exports.create = async (req, res) => {
    const couleur = {
        valeurHexa: req.body.valeurHexa
    };

    // Save Couleur in the database
    Couleur.create(couleur)
        .then(data => {
            res.send({
                message: `Couleur créée`,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Couleur.",
                
            });
        });
};

// Retrieve all Couleur from the database.
exports.findAll = async (req, res) => {
    const saisonId = req.query.saisonId ? req.query.saisonId : null;

    let sql = "SELECT * FROM couleurs";
    let news;
    try {
        if (saisonId) {
            sql += " WHERE \"saisonId\" = $1";
            news = await sequelize.query(sql, {bind: [saisonId], type: sequelize.QueryTypes.SELECT})
        } else {
            news = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
        }
        res.send(news);
    } catch (e) {
        res.status(500).send({
            message: `Le serveur a rencontré une erreur.\n` + e.message,
            data: null
        });
    }
};

// Find a single Couleur with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    Couleur.findByPk(id)
        .then(data => {
            if (data) {
                res.send({
                    message: `Couleur trouvé`,
                    data: data
                });
            } else {
                res.status(404).send({
                    message: `Cannot find Couleurs with id=${id}.`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Couleur with id=" + id,
                
            });
        });
};

// Update a Couleur by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    let newCouleur = {
        valeurHexa: req.body.valeurhexa
    };

    Couleur.update(newCouleur, { where: { couleurId: id } })
        .then(results => {
            if (results[0] > 0) {
                res.status(200).send({
                    message: "Couleur was updated successfully.",
                    data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Pas de couleurs avec id=${id}`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Couleur with id=" + id,
                
            });
        });
};

// Delete a Couleur with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    Couleur.destroy({
        where: { couleurId: id }
    })

        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "Couleur supprimée",
                    
                });
            } else {
                res.status(404).send({
                    message: `Pas de couleur avec id=${id}`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Couleur with id=" + id,
                
            });
        });
};

// Delete all Couleur from the database.
exports.deleteAll = async (req, res) => {
    Couleur.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Couleurs were deleted successfully!`,
                
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Couleur.",
                
            });
        });
};
