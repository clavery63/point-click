import { combineEpics } from 'redux-observable';
import load$ from './load';
import upload$ from './upload';
import preview$ from './preview';
import createObject$ from './createObject';

export default combineEpics(load$, upload$, preview$, createObject$);
