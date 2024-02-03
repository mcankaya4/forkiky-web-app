class SearchView {
  _errMessage = 'No recipes found for your query! Please try again ;)';

  constructor(parentElement) {
    this.parentElement = document.querySelector(`.${parentElement}`);
  }

  searchAddHandler(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const input = this.parentElement.querySelector('.search__field');
    const query = input.value;
    input.value = '';
    return query;
  }
}

export default new SearchView('search');
