const tokenizer = require('jsonwebtoken');
const config = require('../config/config');
const path = require('path');
const fs = require('fs');
const PrKey =fs.readFileSync(path.resolve(__dirname,('../core/'+config.ssh.keyName)));
const Pubkey = fs.readFileSync(path.resolve(__dirname,('../core/'+config.ssh.keyName+'.pub')));
const sign = (data)=>{
	return tokenizer.sign(data,PrKey.toString('utf-8'),{algorithm:'HS256', expiresIn:'2h' })
};
const verify = (token)=>{
	try {
		return tokenizer.verify(token, PrKey,{maxAge:'2h'});
	} catch(err) {
		throw err;
	}

};
const getAndVerify=(req, res, next) => {

	if (req.method == 'OPTIONS'){
		return  next();
	}
	const header = req.headers['authorization'];

	if(typeof header !== 'undefined') {
		const bearer = header.split(' ');
		const token = bearer[1];
		try{
			const verified = verify(token);
			if (verified){
				req.tokenData = verified;
				next();
			}else{
				res.status(403).json({auth:false, reason:"Token is broken"});
			}
		} catch (e) {
			res.status(403).json({auth:false, reason:e.message});
		}

	} else {
		//If header is undefined return Forbidden (403)
		res.status(403).json({auth:false, reason:"Forbidden"});
	}
};
module.exports={sign,getAndVerify,verify};
