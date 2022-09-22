import View from './Views';
import icons from 'url:../../img/icons.svg';
import previewView from './PreviewView';

class BookmarkView extends View {
	_parentEl = document.querySelector('.bookmarks__list');
	_errorMessage = `No bookmarks found yet. Please, find a nice recipe and bookmark it 😇`;

	addBookmarkHandler(handler){
		window.addEventListener('load', handler)
	}

	_genereteMarkup() {
		return this._data.map(result => previewView.render(result, false)).join(' ');
	}
}

export default new BookmarkView;