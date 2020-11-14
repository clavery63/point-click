
import { combineEpics } from 'redux-observable';
import text$ from './text';

export default combineEpics(text$);
