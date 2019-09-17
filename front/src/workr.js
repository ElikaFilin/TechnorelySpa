let connected = false;
const sender = function (url,token,method) {
	const fetchOpt = {
		method: method ? method : "GET",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-Requested-With': 'XMLHttpRequest'
		}
	};
	if (token){
		fetchOpt.headers['Authorization'] = 'Bearer '.concat(token);
	}
	return fetch(url, fetchOpt)

};
self.addEventListener("connect", e => {

	let token=null;
	e.source.addEventListener("message", ev => {
		if (typeof ev.data === "object"){
			if (ev.data.name=='token'){
				token = ev.data.content;
			}
			console.info("JSON input");
		}else{
			console.info("Not JSON input");
		if (ev.data === "start") {
			if (connected === false) {
				e.source.postMessage('worker init');
				connected = true;
			}else if(ev.data === "storage_change"){
				e.source.postMessage('storage_change');
			} else {
				e.source.postMessage('worker already inited');
			}
		}
		}
	}, false);
	e.source.start();

	setInterval(()=>{
	console.log( token);
	if (token){
		sender('http://localhost:3000/api/ping',token,'HEAD')
			.then(r=>{
				if ( !r.ok &&r.status==403){
					console.log("Log out");
					e.source.postMessage({name:"token", content:false, reason:r.statusText});
				}
			});
	}
	},1000*60*3)
}, false);
