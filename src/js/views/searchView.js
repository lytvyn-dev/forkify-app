
class SearchView {
	_parentEL = document.querySelector('.search')


	addHandlerSearch(handler) {
		this._parentEL.addEventListener('submit', function (e) {
			e.preventDefault();
			handler();
		})
	}

	getQuery() {
		const query = this._parentEL.querySelector('.search__field').value;
		this._parentEL.querySelector('.search__field').value = '';
		return query;
	}
}

export default new SearchView;