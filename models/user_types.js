'use strict';
module.exports = (db, DataTypes) => {
	const UserTypes = db.define('UserTypes', {
		id: {
			type: DataTypes.INTEGER(3),
			unique: true,
			primaryKey: true
		},
		type_name: DataTypes.STRING
	}, {db, timestamps: false, tableName: 'user_types'});

	UserTypes.associate = function (models) {
		// associations can be defined here
	};
	console.log(UserTypes);
	return UserTypes;
};