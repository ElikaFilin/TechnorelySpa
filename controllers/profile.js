const models = require('../models');
var users = require('../models').Users;

const view = async (req, res) => {
	const {Users} = models;
	const user = await Users.findByPk(req.tokenData.id);
	if (user) {
		const data = {
			email: user.email,
			phone: user.phone,
			first_name: user.first_name,
			last_name: user.last_name,
			nickname: user.nickname,
			desc: user.desc,
			position: user.position
		};
		return res.json(data);
	}
	return res.json({auth: false});
};

const save = async (req, res) => {
	const {Users} = models;
	const user = await Users.findByPk(req.tokenData.id);
	if (user) {
		const newData = {
			email: user.email,
			phone: req.body.phone,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			nickname: req.body.nickname,
			desc: req.body.desc,
			position: req.body.position
		};
		const UserType = await user.getUserType();
		user.update(newData);
		const userData = {...user.toJSON(), role: UserType.type_name};
		delete userData.user_type_id;
		return res.json(userData);
	}
};

module.exports = {view, save};