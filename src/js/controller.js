import 'core-js';
import 'regenerator-runtime';
import recipeView from './views/reciprView';
import * as modelState from './model.js';
import searchView from './views/searchView';
import { async } from 'regenerator-runtime';
import searchResult from './views/searchResult';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView';
import addRecipe from './views/addRecipe';
import { TIMEOUT_SEC, MODAl_CLOSE_SEC } from './config';

///////////////////////////////////////
//? if(module.hot){
// ?	module.hot.accept();
// ? }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    searchResult.update(modelState.getSearchResultPage());
    bookmarkView.update(modelState.state.bookmarks);
    await modelState.loadRecipe(id);
    recipeView.render(modelState.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    const sideBarQuery = window.matchMedia('(max-width: 768px)');
    function initSideBar(e) {
      if (e.matches) {
        searchResult._toggleClass();
        searchResult._addOpenRecipeHandler();
      }
    }

    sideBarQuery.addEventListener('change', initSideBar);
    initSideBar(sideBarQuery);

    // searchResult._toggleClass();
    searchResult.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await modelState.searchResults(query);
    searchResult.render(modelState.getSearchResultPage());

    // 4) Render initial pagination buttons
    paginationView.render(modelState.state.search);
  } catch (err) {
    searchResult.renderError();
  }
};

// Pagination
const controlPaganation = function (goToPage) {
  // Render html of results from x to y
  searchResult.render(modelState.getSearchResultPage(goToPage));
  paginationView.render(modelState.state.search);
  searchResult.update(modelState.getSearchResultPage());
};

const controlServings = function (newServings) {
  modelState.updateServings(newServings);
  recipeView.update(modelState.state.recipe);
};

const controlAddBookmark = function () {
  //Add bookmark
  if (!modelState.state.recipe.bookmarked) {
    modelState.addBookMark(modelState.state.recipe);
    // Remove bookmark
  } else modelState.deleteBookmark(modelState.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(modelState.state.recipe);
  // 3) Render bookmarks
  bookmarkView.render(modelState.state.bookmarks);
};

const conrolBookmark = function () {
  bookmarkView.render(modelState.state.bookmarks);
};

const controlUpload = async function (newRecipe) {
  try {
    //render spinner
    addRecipe.renderSpinner();

    await modelState.uploadRecipe(newRecipe);

    // Add succses message
    addRecipe.renderMessage();

    //close modal window
    setTimeout(function () {
      addRecipe._toggleWindow();
    }, MODAl_CLOSE_SEC * 1000);

    window.history.pushState(null, '', `#${modelState.state.recipe.id}`);

    // render Bookmark
    bookmarkView.render(modelState.state.bookmarks);

    // Render recipe to view
    recipeView.render(modelState.state.recipe);
  } catch (err) {
    addRecipe.renderError();
  }
};

// Handlers
const init = function () {
  addRecipe.addUploadHandler(controlUpload);
  bookmarkView.addBookmarkHandler(conrolBookmark);
  recipeView.addHandlerBookmarked(controlAddBookmark);
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPaganation(controlPaganation);
  recipeView.addHandlerUpdateServings(controlServings);
};
init();
