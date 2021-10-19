import {ErrorState} from './../store/error.interfaces';
import {Word} from '../modules/words/store/words.interfaces';

export interface AppState {
  error: ErrorState;
  words: Word[];
}
