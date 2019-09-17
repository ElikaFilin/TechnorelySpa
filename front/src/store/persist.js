export default function persistcache(store) {
	window.onstorage = (e) => {
		store.commit('initStore');
		console.log(e);
	};
	store.commit('initStore');

}