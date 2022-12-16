const db = require("../models");
const sequelize = db.sequelize;
const Concert = db.concerts;
const Op = db.Sequelize.Op;


// Create and Save a new Concert
exports.create = async (req, res) => {
    // Create a Concert
    const concert = {
        debut: new Date(req.body.debut),
        duree: req.body.duree,
        sceneId: req.body.sceneId,
        artisteId: req.body.artisteId,
    };

    console.log(concert)

    // Save Concert in the database
    Concert.create(concert)
        .then(data => {
            data.setSaison(req.body.saisonId);
            res.send({
                message: `Concert créé`,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Concert."
            });
        });
};

// Retrieve all Concerts from the database. => WIP maybe middleware
exports.findAllPublished = async (req, res) => {
    Concert.findAll({ where: { published: true } })
        .then(data => {
            res.send({
                message: `Concerts publiés trouvés`,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Concerts.",

            });
        });
}

exports.findAll = async (req, res) => {
    let saisonId = req.query.saisonId

    let sql = "SELECT * FROM concerts"
    if (saisonId) sql+=" WHERE saisonId=$1"

    let data;
    try{
        if (saisonId){
            data = await sequelize.query(sql, {bind:[saisonId], type: sequelize.QueryTypes.SELECT})
        } else {
            data = await sequelize.query(sql, {bind:[saisonId], type: sequelize.QueryTypes.SELECT})
        }
        res.send({
            message: `Concerts trouvés`,
            data: data
        });
    } catch (e){
        console.error(e)
        res.status(500).send({
            message: "Le serveur .",
        });
    }
};

// Find a single Concert with an id
exports.findOne = async (req, res) => {
    const id = req.params.concertId;

    Concert.findByPk(id)
        .then(data => {
            if (data) {
                res.send({
                    message: `Concert trouvé`,
                    data: data
                });
            } else {
                res.status(404).send({
                    message: `Cannot find Concert with id=${id}.`,

                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Concert with id=" + id,

            });
        });
};

// Update a Concert by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    Concert.update(req.body, {
        where: { id: id }
    })
        .then(results => {
            if (results[0] > 0) {

                res.status(200).send({
                    message: "Concert was updated successfully.",
                    data: results[1]
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Concert with id=${id}. Maybe Concert was not found or req.body is empty!`,

                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Concert with id=" + id,

            });
        });
};

// Delete a Concert with the specified id in the request
exports.delete = async (req, res) => {
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
                message: "Could not delete Concert with id=" + id,

            });
        });
};

// Delete all Concerts from the database.
exports.deleteAll = async (req, res) => {
    Concert.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Concerts were deleted successfully!`,
                data: nums
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Concerts.",

            });
        });
};
