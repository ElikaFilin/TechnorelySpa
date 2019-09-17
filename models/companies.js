'use strict';
module.exports = (db, DataTypes) => {
	const Companies = db.define('Companies', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		service_activity: {
			type: DataTypes.STRING,
			allowNull: false
		},
		employee_no: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		desc: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		},


		user_id: {
			type: DataTypes.INTEGER
		}
	}, {db, tableName: 'companies', timestamps: false});
	Companies.associate = function (models) {
		// Companies.hasOne(models.UserTypes, {as: 'userType', key : 'id'});
		// Companies.hasOne(models.Users, {as: 'users', foreignKey:'id'});
	};
	return Companies;
};