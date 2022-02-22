import { combineEpics } from 'redux-observable';
import load$ from './load';
import upload$ from './upload';
import preview$ from './preview';
import createItem$ from './createItem';

export default combineEpics(load$, upload$, preview$, createItem$);
