import icons from 'url:../../img/icons.svg';
import View from './Views';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _data;

  addHandlerPaganation(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _buttonPage(curPage, page) {
    return `
		<button data-goto='${curPage}' class="btn--inline pagination__btn--${page}">
		<span>Page ${curPage}</span>
		<svg class="search__icon">
		  <use href="${icons}#icon-arrow-right"></use>
		</svg>
	 </button>
		`;
  }

  _genereteMarkup(data) {
    const numPage = Math.ceil(data.results.length / data.resultsPerPage);
    const curPage = data.page;

    if (data.page === 1 && numPage > 1) {
      return this._buttonPage(curPage + 1, 'next');
    }

    if (data.page === numPage && numPage > 1) {
      return this._buttonPage(curPage - 1, 'prev');
    }

    if (data.page > 1) {
      return `
		${this._buttonPage(curPage + 1, 'next')}
		${this._buttonPage(curPage - 1, 'prev')}
		`;
    }

    return '';
  }
}

export default new PaginationView();
