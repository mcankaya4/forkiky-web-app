import 'core-js/stable';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    resultView.update(model.getResultsPage());

    bookmarkView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err);
  }
};

const controlSearches = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultView.renderSpinner();

    await model.loadSearch(query);

    resultView.render(model.getResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    resultView.renderError(err);
  }
};

const controlPagination = function (gotoPage) {
  resultView.render(model.getResultsPage(gotoPage));

  paginationView.render(model.state.search);
};

const controlServings = function (info = 4) {
  model.updateServings(info);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  !model.state.recipe.bookmarked
    ? model.addBookmark(model.state.recipe)
    : model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderSuccess();

    bookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(() => {
      addRecipeView.closeWindow();
    }, MODAL_CLOSE_SEC);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

////////////////////////////////////////////////////

(function () {
  addRecipeView.uploadAddHandler(controlAddRecipe);
  bookmarkView.renderAddHandler(controlBookmarks);
  recipeView.renderAddHandler(controlRecipes);
  recipeView.servingsUpdateHandler(controlServings);
  recipeView.bookmarkAddHandler(controlAddBookmark);
  searchView.searchAddHandler(controlSearches);
  paginationView.pageAddHandler(controlPagination);
})();
