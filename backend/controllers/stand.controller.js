const db = require("../models");
const sequelize = db.sequelize;
const Stand = db.stands;
const Op = db.Sequelize.Op;
const TypeStand = db.typeStand;
const Service = db.services;
const Saison = db.saisons;

// Create and Save a new Stand type
exports.create = async (req, res) => {
	// Create a Stand
	const stand = {
		longitude: req.body.longitude,
		latitude: req.body.latitude,
		nom: req.body.nom,
		typeStandId: req.body.typeStandId,
		saisonId: req.body.saisonId,
	};

	console.log(stand)

	let serviceIds = eval(req.body.serviceIds)

	// Save Stand in the database
	let result;
	let msg = "Stand crée"
	let code = 200;
	try {
		result = await Stand.create(stand)
		if (serviceIds) {
			result.setServices(serviceIds)
		}
	} catch (err) {
		console.error(err)
		msg = "Le serveur a rencontré une erreur"
		code = 500;
		result = null;
		Stand.destroy(result);
	}
	res.status(code).send({
		message: msg,
		data: result
	});
};

// Retrieve all Stands from the database.-> still in progress
exports.findAll = async (req, res) => {
	const saisonId = req.body.saisonId



	try {
		sql = "SELECT * FROM stands\n"
		if(saisonId){
			console.log("pute")
			sql += "JOIN saisons s on s.\"saisonId\" = stands.\"saisonId\"\n" +
				"WHERE s.\"saisonId\" = $1;"
		}
		let stands = await sequelize.query(sql, {bind: [saisonId], type: sequelize.QueryTypes.SELECT})
		res.send(stands)
	}catch(e) {
		console.error(e.message)
		res.status(500).send({
			message: "Le server a rencontré un problème."
		});
	}
};

// Find a single Stand with an id
exports.findOne = async (req, res) => {

	// TODO - construct options (filters and includes)

	const id = req.params.id;

	Stand.findByPk(id, {include: [TypeStand, Service, Saison]})
		.then(data => {
			if (data) {
				res.send({
					message: null, data: data
				});
			} else {
				res.status(404).send({
					message: `Cannot find Stand!`,

				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Stand!",
			});
		});
};

// Update a Stand by the id in the request
exports.update = async (req, res) => {
	const id = req.params.id;

	// Create a Stand
	const stand = {
		longitude: req.body.longitude,
		latitude: req.body.latitude,
		nom: req.body.nom,
		typeStandId: req.body.typeStandId,
		saisonId: req.body.saisonId
	};
	console.log(req.body.serviceIds)
	// Update Stand in the database
	let msg, updatedStand, results, code;
	try {
		results = await Stand.update(stand, {where: {standId: id}})
		msg = results[0] > 0 ? "Stand mis à jour" : "Pas de stand trouvé avec l'identifiant " + id;
		updatedStand = results[0] > 0 ? await Stand.findByPk(id) : null;
		code = results[0] > 0 ? 200 : 404

		if (req.body.serviceIds && results[0] > 0) { // check if a stand was updated. Should be 1
			await updatedStand.setServices(eval(req.body.serviceIds))
		}
	} catch (e) {
		msg = "le serveur a rencontré une erreur"
		code = 500
		console.error(e)
	}
	res.status(code).send({
		message: msg,
		data: null
	})
};

// Delete a Stand with the specified id in the request
exports.delete = async (req, res) => {

	Stand.destroy({
		where: {standId: req.params.id}
	})
		.then(num => {
			if (num > 0) {
				res.status(200).send({
					message: "Poi was deleted successfully!",

				});
			} else {
				res.status(404).send({
					message: `Cannot delete Poi with id=${id}. Maybe Poi was not found!`,

				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Cannot find Stand: ${err.message}`,

			});
		});
};

// Delete all Stand from the database.
exports.deleteAll = async (req, res) => {
	Stand.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({
				message: `Stands were deleted successfully!`,
				data: nums
			});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while removing Stands.",

			});
		});
};
