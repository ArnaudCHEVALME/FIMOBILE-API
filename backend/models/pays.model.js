module.exports = (sequelize, Sequelize) => {
	const Pays = sequelize.define("pays", {
		paysId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		nompays: {
			type: Sequelize.STRING,
			allowNull: false
		},
        nbRecherche: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		}
	});
	return Pays;
};
