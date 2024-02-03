import { View } from './view';

class AddRecipeView extends View {
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _errMessage = 'Wrong ingretient format! Please use the corrent format :)';
  _successMessage = 'Recipe was successfully uploaded :)';

  constructor(parentElement) {
    super(parentElement);
    this._showAddHandler();
  }

  uploadAddHandler(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const dataObj = Object.fromEntries(dataArr);
      handler(dataObj);
    });
  }

  _addWindow() {
    this._window.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
    this._closeAddHandler();
  }

  closeWindow() {
    this._window.classList.add('hidden');
    this._overlay.classList.add('hidden');
    window.removeEventListener('keydown', this._closeKeyWindow);
  }

  _closeKeyWindow(e) {
    if (e.key === 'Escape') {
      this.closeWindow();
    }
  }

  _closeAddHandler() {
    this._btnClose.addEventListener('click', this.closeWindow.bind(this));

    this._overlay.addEventListener('click', this.closeWindow.bind(this));

    window.addEventListener('keydown', this._closeKeyWindow.bind(this));
  }

  _showAddHandler() {
    this._btnOpen.addEventListener('click', this._addWindow.bind(this));
  }

  _generateMarkup() {}
}

export default new AddRecipeView('upload');
