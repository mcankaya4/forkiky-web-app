import icons from 'url:../../img/icons.svg';

export class View {
  _errMessage = 'Not Found! (404)';
  _successMessage = '';
  _data;

  constructor(parentElement) {
    this.parentElement = document.querySelector(`.${parentElement}`);
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(
      this.parentElement.querySelectorAll('*')
    );

    newElements.forEach((newEl, i) => {
      const currentEl = currentElements[i];
      if (
        !newEl.isEqualNode(currentEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currentEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(currentEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currentEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
    `;

    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError() {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${this._errMessage}</p>
    </div>
    `;

    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccess(message = this._successMessage) {
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
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear(el = this.parentElement) {
    el.innerHTML = '';
  }
}
