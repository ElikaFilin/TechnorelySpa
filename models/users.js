'use strict';
const UserTypes = require('./user_types').UserTypes;


let Users = (db, DataTypes) => {
	const users = db.define('Users', {
		email: {
			type: DataTypes.STRING,
			email: DataTypes.STRING
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			get() {

			}
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false
		},
		nickname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		desc: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		position: {
			type: DataTypes.TEXT('tiny'),
			allowNull: false
		},
		user_type_id: DataTypes.INTEGER(3).UNSIGNED
	}, {
		db,
		tableName: 'users',
		timestamps: false,
		getterMethods: {
			hashedPassword() {
				console.log("password is")
				return this.getDataValue('password');
			}
		}
	});
	users.associate = function (models) {
		users.hasOne(models.UserTypes, {as: 'userType', foreignKey: 'id', sourceKey: 'user_type_id'});
		users.hasMany(models.Companies, {as: 'Company', foreignKey: 'user_id', underscored: true,});
	}

	return users;
};

module.exports = Users;