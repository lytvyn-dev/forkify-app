import View from './Views';
import icons from 'url:../../img/icons.svg';
import previewView from './PreviewView';

class SearchResult extends View {
  _parentEl = document.querySelector('.results');
  _data;
  _closeSidebarBtn = document.querySelector('.btn--close-sidebar');
  _openSidebarBtn = document.querySelector('.sidebar-btn');
  _errorMessage = `We could not find the recipe based on your query 🙁`;
  _sideBar = document.querySelector('.search-results');

  constructor() {
    super();
    this.toggleSideBarBtns();
  }

  _genereteMarkup() {
    return this._data
      .map(result => previewView.render(result, false))
      .join(' ');
  }

  toggleSideBarBtns() {
    [this._closeSidebarBtn, this._openSidebarBtn].forEach(btn => {
      btn.addEventListener('click', this._toggleClass.bind(this));
    });
  }

  _toggleClass() {
    this._sideBar.classList.toggle('sidebar');
  }

  _addOpenRecipeHandler() {
    this._parentEl.addEventListener('click', this._openRecipe.bind(this));
  }

  _openRecipe(e) {
    const recipe = e.target.closest('.preview__link');
    if (!recipe) return;
    this._sideBar.classList.remove('sidebar');
  }
}

export default new SearchResult();
