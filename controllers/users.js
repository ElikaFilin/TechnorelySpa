var users = require('../models').Users;
var userTypes = require('../models').UserTypes;
const db = require('../models');
const {sequelize, Sequelize} = db;

module.exports = {
	list: async (req, res) => {
		let types = await userTypes.findAll();
		types = types.map(model => model.toJSON());
		users.findAll().then(users => {
			const usersList = users.map((item) => {
				let itemObj = item.toJSON();
				itemObj.role = types.find(value => value.id == itemObj.user_type_id).type_name;
				delete itemObj.user_type_id;
				return itemObj;
			});
			res.json({usersList: true, data: usersList})
		})
			.catch(error => {
				res.status(404).json({usersList: false, message: error})
			})
	},
	delete: (req, res) => {
		let id = req.params.id;
		if (req.tokenData.role == 'admin' && id) {

			users.findByPk(req.params.id).then(user => {
				if (!user)
					throw  new Error();
				user.getCompany().then(companies => {
					for (let company of companies) {
						company.destroy();
					}
					user.destroy();
				});

				res.status(201).json({delete: true, data: {message: `User ${id} was deleted`, id}});
			}).catch(error => {
				res.status(403).json({delete: false, message: `User ${id} wasn't found \n`.concat(error)});
			});
		} else {
			res.status(403).json({delete: false, message: "You don't have enough rights to delete user"});
		}

	},
	view: (req, res) => {
		const id = req.params.id;
		users.findByPk(id).then(user => {
			if (user) {
				res.json({view: true, data: user})
			} else res.json({view: false, message: `User ${id} wasn't found`})
		})
			.catch(error => {
				res.status(404).json({view: false, message: `User ${id} wasn't found\n`.concat(error)})
			})
	},
	edit: (req, res) => {
		const dataUser = req.body;
		const id = req.params.id;
		users.findByPk(id).then(user => {
			if (user) {
				const newUser = {
					email: dataUser.email,
					desc: dataUser.desc,
					first_name: dataUser.first_name,
					last_name: dataUser.last_name,
					nickname: dataUser.nickname,
					position: dataUser.position,
					phone: dataUser.phone,
				};
				user.update(newUser);
				res.json({save: true});
			} else {
				res.status(404).json({save: false, message: `User ${id} wasn't found`})
			}
		})
			.catch(error => {
				res.status(404).json({save: false, message: `User ${id} wasn't found\n`.concat(error)})
			})
	}
};

