const db = require("../models");
const CategorieReseau = db.categoriesReseaux;
const Op = db.Sequelize.Op;

// Create and Save a new CategorieReseau
exports.create = (req, res) => {
    // Create a CategorieReseau
    const categorieReseau = {
        libelle: req.body.libelle,
    };

    // Save CategorieReseau in the database
    CategorieReseau.create(categorieReseau)
        .then(data => {
            res.send({
                message: `Categorie reseau créée`,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the CategorieReseau.",
                
            });
        });
};

// Retrieve all CategoriesReseaux from the database.
exports.findAll = (req, res) => {
    const libelle = req.query.libelle;
    let condition = libelle ? { libelle: { [Op.iLike]: `%${libelle}%` } } : null;

    CategorieReseau.findAll({ where: condition })
        .then(data => {
            res.send({
                message: `Cattegories reseaux trouvées`,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving CategoriesReseaux.",
                
            });
        });
};

// Find a single CategorieReseau with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    CategorieReseau.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find CategorieReseau with id=${id}.`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving CategorieReseau with id=" + id,
                data : null
            });
        });
};

// Update a CategorieReseau by the id in the request
exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    const newValues = { libelle: req.body.libelle };

    CategorieReseau.update(newValues, {
        where: { categorieReseauId: id }
    })
        .then(results => {
            if (results[0] > 0) {
                res.status(200).send({
                    message: "CategorieReseau was updated successfully.",
                    data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Cannot update CategorieReseau with id=${id}. Maybe CategorieReseau was not found or req.body is empty!`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating CategorieReseau with id=" + id,
                
            });
        });
};

// Delete a CategorieReseau with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    CategorieReseau.destroy({
        where: { categorieReseauId: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "CategorieReseau was deleted successfully!",
                    data: num
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete CategorieReseau with id=${id}. Maybe CategorieReseau was not found!`,
                    data: num
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete CategorieReseau with id=" + id,
                
            });
        });
};

// Delete all CategoriesReseaux from the database.
exports.deleteAll = (req, res) => {
    CategorieReseau.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} CategoriesReseaux were deleted successfully!`,
                
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all CategoriesReseaux.",
                
            });
        });
};
