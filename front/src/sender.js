import {getToken} from "./getToken";

const sender = async function (url, data, method) {
	const userData = getToken();

	const fetchOpt = {
		method: method ? method : "GET",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-Requested-With': 'XMLHttpRequest'
		},
		body: data ? JSON.stringify(data) : null
	};
	if (userData && userData.accessToken) {
		fetchOpt.headers['Authorization'] = 'Bearer '.concat(userData.accessToken);
	}

	const promise = await fetch(url, fetchOpt);
	return promise.json();
};

export default sender