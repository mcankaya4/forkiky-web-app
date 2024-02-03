import previewView from './previewView';
import { View } from './view';

class BookmarkView extends View {
  _errMessage = 'No bookmarks yet!';

  constructor(parentElement) {
    super(parentElement);
  }

  renderAddHandler(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView('bookmarks');
