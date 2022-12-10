const db = require("../models");
const News = db.news;
const Op = db.Sequelize.Op;

// Create and Save a new Genre
exports.create = async (req, res) => {

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
exports.findAll = async (req, res) => {
	const saisonId = req.query.saisonId;
	let condition = saisonId ? {saisonId: {[Op.eq]: saisonId}} : null;

	News.findAll({where: condition})
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
exports.findOne = async (req, res) => {
	const id = req.params.id;

	News.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find News with id=${id}.`,
					data: null
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: null,
				data: err
			});
		});
};

// Update a Genre by the id in the request
exports.update = async (req, res) => {
	const id = req.params.id;
	const newValues =
		{
			titre: req.body.titre,
			description: req.body.description,
			publishAt: req.body.publishAt,
			saisonId: req.body.saisonId
		};

	console.log(newValues);
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
exports.delete = async (req, res) => {
	const id = req.params.id;

	News.destroy({
		where: {newsId: id}
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
				message: null,
				data: err
			});
		});
};

// Delete all Genres from the database.
exports.deleteAll = async (req, res) => {
	News.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({message: `${nums} News were deleted successfully!`});
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all News."
			});
		});
};
