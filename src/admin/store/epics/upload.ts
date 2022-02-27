import { RootState } from 'admin/ui/hooks/redux';
import { merge, Observable, of } from 'rxjs';
import {
  switchMap, mapTo, withLatestFrom, filter, pairwise, tap, catchError,
} from 'rxjs/operators';
import S3 from 'shared/util/S3';
import validateGameState from 'shared/validation/validateGameState';
import { Action } from 'typesafe-actions';
import {
  uploadComplete, uploadGame, resetUploadState, UploadState, uploadError,
} from '../reducers/editorStateReducer/uploadStateReducer';

const resetStates = [UploadState.ERROR, UploadState.COMPLETE];

const handleUpload = async (state: RootState) => {
  const s3 = new S3(state.gameName);
  return s3.writeObject('gamedata.json', JSON.stringify(state.gameState));
};

const upload$ = (action$: Observable<Action>, state$: Observable<RootState>) => {
  const handleUpload$ = action$.pipe(
    filter(uploadGame.match),
    withLatestFrom(state$, (_, state) => state),
    tap(state => validateGameState(state.gameState)),
    switchMap(handleUpload),
    mapTo(uploadComplete()),
    catchError(() => of(uploadError())),
  );

  const reset$ = state$.pipe(
    pairwise(),
    /**
     * No matter the change, if the last action before this was upload complete,
     * reset the upload state.
     *
     * Because createSlice provides no way to react to all actions.
     *
     * Because they probably think that's "bad"
     *
     * **rant alert**
     *
     * Dear redux-toolkit,
     *
     * I get it. In software engineering, imposing smart restrictions yields
     * greater freedom in the long run.
     *
     * The problem is, the restrictions you impose aren't all that smart, or
     * well thought out.
     *
     * And there are bugs. Especially in your typescript implementation.
     *
     * Love,
     * Chris
     */
    filter(([previousState]) => resetStates.includes(previousState.editorState.uploadState)),
    mapTo(resetUploadState()),
  );

  return merge(handleUpload$, reset$);
};

export default upload$;
