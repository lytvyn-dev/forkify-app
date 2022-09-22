import icons from 'url:../../img/icons.svg'
import View from './Views';

class AddRecipe extends View {
	_parentEl = document.querySelector('.upload');
	_data;
	_openBtn = document.querySelector('.nav__btn--add-recipe');
	_closeBtn = document.querySelector('.btn--close-modal');
	_window = document.querySelector('.add-recipe-window');
	_overlay = document.querySelector('.overlay')
	_errorMessage = `Wrong format  😕`;
	_message = `The recipe was loaded 👍`

	constructor() {
		super()
		this.addHandlerOpenModal();
		this.addHandlerCloseModal();
	}

	_toggleWindow() {
		this._window.classList.toggle('hidden');
		this._overlay.classList.toggle('hidden');
	}

	addHandlerOpenModal() {
		this._openBtn.addEventListener('click', this._toggleWindow.bind(this));
	}

	addHandlerCloseModal() {
		[this._closeBtn, this._overlay].forEach(close => close.addEventListener('click', this._toggleWindow.bind(this)));
	}

	addUploadHandler(handler) {
		this._parentEl.addEventListener('submit', function(e){
			e.preventDefault();
			const dataArray = [...new FormData(this)];
			const data = Object.fromEntries(dataArray)
			handler(data)
		})
	}
}




export default new AddRecipe;