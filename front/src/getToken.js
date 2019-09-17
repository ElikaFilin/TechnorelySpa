const getToken =()=>{
	return JSON.parse(localStorage.getItem('userToken'));
};

export {getToken}
