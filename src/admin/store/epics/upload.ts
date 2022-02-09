import { RootState } from 'admin/ui/hooks/redux';
import { Observable } from 'rxjs';
import {
  switchMap, mapTo, withLatestFrom, filter,
} from 'rxjs/operators';
import S3 from 'shared/util/S3';
import { Action } from 'typesafe-actions';
import { uploadComplete, uploadGame } from '../reducers/editorStateReducer/uploadStateReducer';

const handleUpload = async (state: RootState) => {
  const s3 = new S3(state.gameName);
  return s3.writeObject('gamedata.json', JSON.stringify(state.gameState));
};

const upload$ = (action$: Observable<Action>, state$: Observable<RootState>) => {
  return action$.pipe(
    filter(uploadGame.match),
    withLatestFrom(state$, (_, state) => state),
    switchMap(handleUpload),
    mapTo(uploadComplete()),
  );
};

export default upload$;
