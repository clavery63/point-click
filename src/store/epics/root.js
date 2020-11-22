import { combineEpics } from 'redux-observable';
import animation$ from './animation';
import cursor$ from './cursor';
import load$ from './load';
import text$ from './text';
import transition$ from './transition';

export default combineEpics(animation$, cursor$, load$, text$, transition$);
