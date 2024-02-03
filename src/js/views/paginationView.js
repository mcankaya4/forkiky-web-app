import { View } from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  constructor(parentElement) {
    super(parentElement);
  }

  pageAddHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('button');

      if (!btn) return;

      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // prev hidden, next visible
    if (this._data.page === 1 && numPages > 1)
      return `
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;

    // prev visible, next hidden
    if (this._data.page === numPages && numPages > 1)
      return `
      <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
    `;

    // prev & next visible
    if (this._data.page < numPages) {
      return `
      <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }

    // prev & next hidden
    return '';
  }
}

export default new PaginationView('pagination');
