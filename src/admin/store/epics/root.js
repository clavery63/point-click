import { combineEpics } from 'redux-observable';
import load$ from './load';
import upload$ from './upload';

export default combineEpics(load$, upload$);
