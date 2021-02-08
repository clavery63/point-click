import { combineEpics } from 'redux-observable';
import animation$ from './animation';
import audio$ from './audio';
import cursor$ from './cursor';
import load$ from './load';
import save$ from './save';
import text$ from './text';
import transition$ from './transition';

export default combineEpics(audio$, animation$, cursor$, load$, save$, text$, transition$);
