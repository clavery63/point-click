import { combineEpics } from 'redux-observable';
import load$ from './load';
import text$ from './text';
import transition$ from './transition';

export default combineEpics(load$, text$, transition$);
