import { combineEpics } from 'redux-observable';
import load$ from './load';

export default combineEpics(load$);
