var users = require('../models').Users;
const Companies = require('../models').Companies;

module.exports = {
	save: (req, res) => {
		let newCompany = Companies.build({
			name: req.body.form.name,
			address: req.body.form.address,
			employee_no: req.body.form.employees,
			desc: req.body.form.description,
			type: req.body.form.type,
			service_activity: req.body.form.service,
			user_id: req.tokenData.id
		});
		newCompany.save().then(company => {
			if (company) {
				res.json({save: true})
			}
		})
			.catch(error => res.status(400).send(error));
	},
	list: (req, res) => {
		const sort = req.query.sort
			?
			{
				column: req.query.column,
				direction: req.query.direction
			}
			:
			null;
		let order;
		if (sort) {
			order = {
				order:
					[[
						sort.column,
						sort.direction == 0 ? 'DESC' : 'ASC'
					]]
			};
		}
		if (req.query.all == 1 && req.tokenData.role == 'admin') {
			Companies.findAll(order).then(c => {
				res.json({list: true, data: c})
			});
		} else {
			Companies.findAll({...order, where: {user_id: req.tokenData.id}})
				.then(c => {
					res.json({list: true, data: c})
				})
				.catch(error=>{
					res.status(404).json({
						list: false,
						message: `The companies were not sorted\n `.concat(error)
					});
				});
		}
	},
	delete: (req, res) => {
		let id = req.params.id;
		let companyQuery;
		if (req.tokenData.role === 'admin') {
			companyQuery = {where: {id}};
		} else {
			companyQuery = {
				where: {
					user_id: req.tokenData.id,
					id
				}
			};
			console.log(req.tokenData.role)
		}
		Companies.destroy(companyQuery)
			.then((record) => {
				console.log(record);
				if (record === 1) {
					res.json({delete: true, data: `Company  ${idComp} deleted `})
				} else {
					res.status(400).json({
						delete: false,
						message: `Company ${idComp} has not been deleted\n `.concat("Company doesn't exist")
					});
				}
			})
			.catch(error => {
				res.status(400).json({
					delete: false,
					message: `Company ${idComp} has not been deleted\n `.concat(error)
				});
			})
	},
	view: (req, res) => {
		let id = req.params.id;
		let companyModel;
		if (req.tokenData.role === 'admin') {
			companyModel = Companies.findByPk(id);
		} else {
			companyModel = Companies.findOne({
				where: {
					user_id: req.tokenData.id,
					id
				}
			});
			console.log(req.tokenData.role)
		}
		companyModel.then(company => {
			if (company) {
				res.json({view: true, data: company});
			} else {
				res.status(404).json({view: false, message: `Company ${id} wasn\'t found`})
			}
		})
			.catch(error => {
				res.status(400).json({view: false, message: "Something went wrong. \n".concat(error)});
			})
	},
	edit: (req, res) => {
		let dataCompany = req.body.data;
		let id = req.params.id;
		let companyModel;
		if (req.tokenData.role === 'admin') {
			companyModel = Companies.findByPk(id);
		} else {
			companyModel = Companies.findOne({
				where: {
					user_id: req.tokenData.id,
					id
				}
			});
		}
		companyModel.then(company => {
			if (company) {
				const newCompany = {
					name: dataCompany.name,
					address: dataCompany.address,
					employee_no: dataCompany.employee_no,
					desc: dataCompany.desc,
					type: dataCompany.type,
					service_activity: dataCompany.service_activity
				};
				company.update(newCompany);
				res.json({save: true})
			} else {
				res.status(400).json({save: false, message: `Company ${id} has not been updated`})
			}
		})
			.catch(error => {
				res.status(400).json({save: false, message: `Company ${id} has not been updated.\n`.concat(error)})
			})
	}
};

