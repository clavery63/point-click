import { combineEpics } from 'redux-observable';
import cursor$ from './cursor';
import load$ from './load';
import text$ from './text';
import transition$ from './transition';

export default combineEpics(cursor$, load$, text$, transition$);
