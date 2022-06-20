import { combineEpics } from 'redux-observable';
import load$ from './load';
import preview$ from './preview';
import createObject$ from './createObject';

export default combineEpics(load$, preview$, createObject$);
