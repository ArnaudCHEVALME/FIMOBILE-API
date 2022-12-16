const db = require("../models");
const TypeStand = db.typeStand;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new Stand type
exports.create = async (req, res) => {
    // Create a Stand type
    const typeStand = {
        libelle: req.body.libelle,
    };

    // Save Stand type in the database
    TypeStand.create(typeStand)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the stand type."
            });
        });
};

// Retrieve all Stand types from the database.
exports.findAll = async (req, res) => {
    const saisonId = req.body.saisonId;

    try{
        let sql = "SELECT \"typeStands\".\"libelle\", \"typeStands\".\"nbRecherche\" FROM \"typeStands\""
        if(saisonId){
            sql += "JOIN stands s ON \"typeStands\".\"typeStandId\" = s.\"typeStandId\"\n" +
                "JOIN saisons s2 ON s2.\"saisonId\" = s.\"saisonId\"\n" +
                "WHERE s2.\"saisonId\" = $1;"
        let typeStand = await sequelize.query(sql, {bind: [saisonId], type: sequelize.QueryTypes.SELECT})
        res.send(typeStand);
        }
    }
    catch(e) {
            res.status(500).send({
                message: "Le server a rencontrer un problème.\n" + e.message
            });
    }

};

// Find a single Stand type with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;


    TypeStand.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find stand types with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving TypeStand with id=" + id
            });
        });
};

// Update a Stand type by the id in the request
exports.update = async (req, res) => {
    const id = parseInt(req.params.id);
    const newValues = { libelle: req.body.libelle };


    TypeStand.update(newValues, {
        where: { typeStandId: id }
    })
        .then(results => {
            if (results[0] > 0) {

                res.status(200).send({
                    message: "Type stand was updated successfully.", data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Cannot update type stand with id=${id}. Maybe Genre was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating type stand with id=" + id
            });
        });
};

// Delete a Stand type with the specified id in the request
exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);

    TypeStand.destroy({
        where: { typeStandId: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(200).send({
                    message: "Type stand was deleted successfully!",
                    
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete type stand with id=${id}. Maybe Genre was not found!`,
                    
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete type stand with id=" + id
            });
        });
};

// Delete all Stand types from the database.
exports.deleteAll = async (req, res) => {
    TypeStand.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Type stand were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Type stand."
            });
        });
};
