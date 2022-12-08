module.exports = (sequelize, Sequelize) => {
	const ordreCouleurSaison = sequelize.define("ordreCouleurSaison", {
		ordreCouleurSaisonId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		ordre: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	});
	return ordreCouleurSaison;
};