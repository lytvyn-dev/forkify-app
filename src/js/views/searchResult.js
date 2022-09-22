import View from './Views';
import icons from 'url:../../img/icons.svg';
import previewView from './PreviewView';

class SearchResult extends View {
	_parentEl = document.querySelector('.results');
	_data;
	_errorMessage = `We could not find the recipe based on your query 🙁`;

	
	_genereteMarkup() {
		return this._data.map(result => previewView.render(result, false)).join(' ');
	}

}

export default new SearchResult;