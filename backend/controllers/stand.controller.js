const db = require("../models");
const Stand = db.stands;
const Op = db.Sequelize.Op;
const TypeStand = db.typeStand;
const Service = db.services;
const Saison = db.saisons;

// Create and Save a new Stand type
exports.create = (req, res) => {
	// Create a Stand
	const stand = {
		longitude: req.body.longitude,
		latitude: req.body.latitude,
		nom: req.body.nom,
		visites: 0, // tous les champs visites sont pour les stats et donc à initier à 0
		typeStandId: req.body.typeStandId,
		saisonId: req.body.saisonId,
	};

	// Save Stand in the database
	Stand.create(stand, { include: Service })
		.then(result => {
			result.addService(eval(req.body.serviceIds))
				.then(() => {
					res.status(200).send({
						message: "Stand created",
						data: result.include
					});
				}).catch(err => {
					res.status(500).send({
						message: "Stand created error linking with services\n" + err.message,
						
					});
				})
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Poi.",
				
			});
		});
};

// Retrieve all Stands from the database.-> still in progress
exports.findAll = (req, res) => {

	// TODO - construct options (filters and includes)

	const longitude = req.body.longitude;
	const latitude = req.body.latitude;
	const nom = req.body.nom;
	const visites = req.body.visites;

	Stand.findAll({ include: [TypeStand, Service, Saison] }) // pas toujours besoin de tout inclure ?
		.then(data => {
			res.send({
				message: null,
				data: data
			});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving Pois.",
				
			});
		});
};

// Find a single Stand with an id
exports.findOne = (req, res) => {

	// TODO - construct options (filters and includes)

	const id = req.params.id;

	Stand.findByPk(id, { include: [TypeStand, Service, Saison] })
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
exports.update = (req, res) => {
	const id = req.params.id;

	// Create a Stand
	const stand = {
		longitude: req.body.longitude,
		latitude: req.body.latitude,
		nom: req.body.nom,
		typeStandId: req.body.typeStandId,
		saisonId: req.body.saisonId,
	};

	// Update Stand in the database
	Stand.update(stand, { where: { standId: id } })

		.then(results => {
			if (results[0] > 0) {

				res.status(200).send({
					message: "Stand mis à jour", data: results[1]
				});
			} else {
				res.status(404).send({
					message: "Stand mis à jour mais problème dans la liaison des services\n" + err.message
				});
			}
		})
		.catch(err => {
			res.status(500).send({ message: err.message || "Erreur pendant la mise à jour du Stand" });
		});
};

// Delete a Stand with the specified id in the request
exports.delete = (req, res) => {

	Stand.destroy({
		where: { standId: req.params.id }
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
exports.deleteAll = (req, res) => {
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
