var jwt = require('../core/jwt');
var users = require('../models').Users;
var secret = require('../config/config').secret;
const bcrypt = require('bcryptjs');

const index = (req, resp) => {
	users.findAll().then((companies) => {
		resp.render('index', {title: 'Express', c_count: companies.length});

	});
};

const register = (req, res) => {
	let {email, password, phone, first_name, last_name, nickname, description, position} = req.body;
	password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	let newUser = users.build({
		email,
		password,
		phone,
		first_name,
		last_name,
		nickname,
		position,
		desc: description,
		user_type_id: 1
	});
	newUser.save().then(async (user) => {

		if (user) {
			const UserType = await user.getUserType();
			const userData = {...user.toJSON(), role: UserType.type_name};
			delete userData.user_type_id;
			const token = jwt.sign({
				email: user.email,
				login: user.nickname,
				id: user.id,
				role: UserType.type_name
			});
			if (token) {
				res.json({auth: true, registered: true, accessToken: token, user: userData});
			} else {
				res.json({auth: false, registered: true, accessToken: false, user: userData});
			}

			res.end();
		} else {
			res.json({auth: false, registered: false, message: 'Try to register again'});
		}
	}).catch((e) => {
		console.error(e);
		res.json({auth: false, registered: false, message: 'Try to register again'});
	});


};

const signin = (req, res) => {
	const {email, password} = req.body;
	if (!!(email && password)) {
		users.findOne({
			where: {
				email: req.body.email
			}
		}).then(async user => {
			if (!user) {
				return res.json({auth: false, message: 'You are not registered'})
			} else {
				passwd = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
				if (bcrypt.compareSync(password, user.hashedPassword)) {
					const UserType = await user.getUserType();
					const userData = {...user.toJSON(), role: UserType.type_name};
					delete userData.user_type_id;
					const token = jwt.sign({
						email: user.email,
						login: user.nickname,
						id: user.id,
						role: UserType.type_name
					});
					return res.status(200).send({auth: true, accessToken: token, user: userData});
				} else {
					return res.json({auth: false, message: 'Email and password should not be empty'});
				}
			}
		});
	} else {
		return res.json({auth: false, message: 'Email and password should not be empty'});

	}

};

module.exports = {
	index, register, signin
};