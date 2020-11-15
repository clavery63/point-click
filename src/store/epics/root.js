
import { combineEpics } from 'redux-observable';
import load$ from './load';
import text$ from './text';

export default combineEpics(load$, text$);
