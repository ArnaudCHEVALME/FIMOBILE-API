const db = require("../models");
const Artiste = db.artistes;
const Concert = db.concerts;
const Saison = db.saisons;
const sousGenre = db.sousGenres;
const Op = db.Sequelize.Op;

// Create and Save new Artistes
exports.create = async (req, res) => {
	// Create a new Artistes
	const artiste = {
		name: req.body.name,
		bio: req.body.bio,
		bannerPath: req.body.bannerPath,
		linkClip: req.body.linkClip,
	};
	let nvArtiste;
	// Save Artiste in the database
	try {
		nvArtiste = await Artiste.create(artiste);
		await Promise.all(
			[
				nvArtiste.addSousGenre(eval(req.body.sousGenreId)),
				nvArtiste.addConcert(eval(req.body.concertId)),
				nvArtiste.addPays(eval(req.body.paysId))
			]
		);
	} catch {
		Artiste.destroy(nvArtiste);
		res.status(500).send({
			message: "données incorectes : " + error.message,
			data: null
		});
		return;
	}
	res.status(200).send({
		message: "Artistes et ses associations créé",
		data: nvArtiste
	})
};

// Retrieve all Artiste from the database.
exports.findAll = async (req, res) => {
	let saisonId = req.body.saisonId
	let condition = null

	if (saisonId) {
		condition = {
			attributes: Artiste.getAttributes(),
			include: {
				model: Concert,
				where: {saisonId: saisonId},
				required:false,
			}
		}
	}

	Artiste.findAll(condition)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: `Le serveur a rencontré une erreur.\n` + err.message,
				data: null
			});
		});
};

// Find a single Artiste with an id
exports.findOne = async (req, res) => {
	const id = req.params.id;

	Artiste.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Pas de genre avec id=${id}.`, data: null
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Le serveur a rencontré une erreur pour l'id=${id}.\n` + err.message, data: null
			});
		});
};


// Update an Artiste by the id in the request
exports.update = async (req, res) => {
	const id = parseInt(req.params.artisteId);
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
					message: "Artiste mis à jour.", data: data[1]
				});
			} else {
				res.send.status(404)({
					message: `Pas de genre avec id=${id}.`, data: null
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Le serveur a rencontré une erreur pour l'id=${id}.\n` + err.message, data: null
			});
		});
};


// Delete an Artiste with the specified id in the request
exports.delete = async (req, res) => {
	const id = parseInt(req.params.id);

	Artiste.destroy({
		where: {artisteId: id}
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
exports.deleteAll = async (req, res) => {
	Artiste.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.status(200).send({
				message: `${nums} Artistes ont bien été supprimé.`
			});
		})
		.catch(err => {
			res.status(500).send({
				message: `Le serveur a rencontré une erreur pour l'id=${id}.\n` + err.message, data: null
			});
		});
};