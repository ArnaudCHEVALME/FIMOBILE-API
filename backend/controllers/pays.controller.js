const db = require("../models");
const Pays = db.pays;
const Op = db.Sequelize.Op;

// Create and Save a new Pays
exports.create = (req, res) => {
    // Create a Pays
    const pays = {
        nompays: req.body.nompays,
    };

    // Save Pays in the database
    Pays.create(pays)
        .then(data => {
            res.send({
                message: `Pays créé`,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Pays.",
                
            });
        });
};

// Retrieve all Pays from the database.
exports.findAll = (req, res) => {
    const nompays = req.query.nompays;
    let condition = nompays ? { nompays: { [Op.iLike]: `%${nompays}%` } } : null;

    Pays.findAll({ where: condition })
        .then(data => {
            res.send({
                message: `Pays trouvés`,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Pays.",
                
            });
        });
};

// Find a single Pays with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pays.findByPk(id)
        .then(data => {
            if (data) {
                res.send({
                    message: `Pays trouvé`,
                    data: data
                });
            } else {
                res.status(404).send({
                    message: `Cannot find Pays with id=${id}.`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pays with id=" + id,
                
            });
        });
};

// Update a Pays by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    const newNomPays = { nompays: req.body.nompays };

    Pays.update(newNomPays, {
        where: { paysId: id }
    })
        .then(results => {
            if (results[0] > 0) {
                res.status(200).send({
                    message: "Pays was updated successfully.",
                    data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Pays with id=${id}. Maybe Pays was not found or req.body is empty!`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pays with id=" + id,
                
            });
        });
};

// Delete a Pays with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Pays.destroy({
        where: { paysId: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "Pays was deleted successfully!",
                    
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Pays with id=${id}. Maybe Pays was not found!`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pays with id=" + id,
                
            });
        });
};

// Delete all Pays from the database.
exports.deleteAll = (req, res) => {
    Pays.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Pays were deleted successfully!`,
                data: nums
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Pays.",
            });
        });
};
