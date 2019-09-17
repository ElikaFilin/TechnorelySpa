const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const util = require('util');

const run= async ()=>{
	const fileLocation = path.resolve(__dirname, config.ssh.keyName);
	console.log(fileLocation);
	if ( ! fs.existsSync(fileLocation)) {
		const comment = "JWT secret";
		const ssh = util.promisify(require('ssh-keygen'));
		console.log(ssh);
		try {
			const  out =  await ssh({location: fileLocation, comment,read:true});
				console.log('Keys created!');
				console.log('private key: '+out.key);
				console.log('public key: '+out.pubKey);
			}
			catch (rr) {
				console.error("Something wrong");
				procces.exit(1);
			}
		}


	};
module.exports = function* (){
	yield run();

}

