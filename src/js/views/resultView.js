import { View } from './view';
import previewView from './previewView';

class ResultView extends View {
  _errMessage = 'No recipes found for your query! Please try again ;)';

  constructor(parentElement) {
    super(parentElement);
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView('results');
