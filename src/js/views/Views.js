import icons from 'url:../../img/icons.svg';
export default class View {
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    if (!render) return this._genereteMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML(
      'afterbegin',
      this._genereteMarkup(this._data)
    );
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }

  update(data) {
    this._data = data;

    const markUp = this._genereteMarkup(data);
    const newDom = document.createRange().createContextualFragment(markUp);
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));
    const newElements = Array.from(newDom.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //! Note: If you want to return the text of an element, remember that text is always inside a Text node, and you will have to return the Text node's node value (element.childNodes[0].nodeValue).
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.childNodes[0]?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attrb => {
          curEl.setAttribute(attrb.name, attrb.value);
        });
      }
    });
  }

  renderSpinner() {
    const html = `
	<div class="spinner">
	<svg>
	  <use href="${icons}#icon-loader"></use>
	</svg>
 </div>
	`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderError(message = this._errorMessage) {
    const html = `
		<div class="error">
		<div>
		  <svg>
			 <use href="${icons}#icon-alert-triangle"></use>
		  </svg>
		</div>
		<p>${message}</p>
		</div>		
`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderMessage(message = this._message) {
    const markup = `
		  <div class="message">
			 <div>
				<svg>
				  <use href="${icons}#icon-smile"></use>
				</svg>
			 </div>
			 <p>${message}</p>
		  </div>
		`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
