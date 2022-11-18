const db = require("../models");
const Stand = db.stands;
const Op = db.Sequelize.Op;
const TypeStand = db.typeStand;
const Service = db.services;

// Create and Save a new Stand type
exports.create = (req, res) => {

	// TODO - Plutôt que vérifier chaque paramètre, autant partir du principe que la vue n'envoie pas la requête sans
	//  les paramètres correctes. Surtout qu'on va catch les erreur dans le bloc plus bas

	// Create a Stand
	const stand = {
		longitude: req.body.longitude,
		latitude: req.body.latitude,
		nom: req.body.nom,
		visites: 0, // tout les champs visites sont pour les stats et donc à initier à 0
		typeStandId: req.body.typeStandId,
		saisonId: req.body.saisonId,
	};

	// Save Stand in the database
	Stand.create(stand, { include: Service })
		.then(result => {
			result.addService(eval(req.body.serviceIds))
				.then(() => {
					res.status(200).send({ message: "Stand created", data: result.include });
				}).catch(err => {
					res.status(500).send({ message: "Stand créé mais erreur dans la liaison des services\n" + err.message, data: null });
				})
		})
		.catch(err => {
			res.status(500).send({ message: err.message || "Some error occurred while creating the Poi." });
		});
};

// Retrieve all Stands from the database.-> still in progress
exports.findAll = (req, res) => {

	// TODO - construct options (filters and includes)

	const longitude = req.query.longitude;
	const latitude = req.query.latitude;
	const nom = req.query.nom;
	const visites = req.query.visites;

	Stand.findAll({ include: [TypeStand, Service] }) // pas toujours besoin de tout inclure ?
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving Pois."
			});
		});
};

// Find a single Stand with an id
exports.findOne = (req, res) => {

	// TODO - construct options (filters and includes)

	const id = req.params.id;

	Stand.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Stand with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Stand with id=" + id
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
	const id = req.params.id;

	Stand.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num > 0) {
				res.status(200).send({
					message: "Poi was deleted successfully!",
					data: null
				});
			} else {
				res.status(404).send({
					message: `Cannot delete Poi with id=${id}. Maybe Poi was not found!`,
					data: null
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Poi with id=" + id
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
			res.send({ message: `${nums} Pois were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all Pois."
			});
		});
};
