import { RootState } from 'admin/ui/hooks/redux';
import { merge, Observable } from 'rxjs';
import {
  switchMap, mapTo, withLatestFrom, filter, pairwise,
} from 'rxjs/operators';
import S3 from 'shared/util/S3';
import { Action } from 'typesafe-actions';
import {
  uploadComplete, uploadGame, resetUploadState, UploadState,
} from '../reducers/editorStateReducer/uploadStateReducer';

const handleUpload = async (state: RootState) => {
  const s3 = new S3(state.gameName);
  return s3.writeObject('gamedata.json', JSON.stringify(state.gameState));
};

const upload$ = (action$: Observable<Action>, state$: Observable<RootState>) => {
  const handleUpload$ = action$.pipe(
    filter(uploadGame.match),
    withLatestFrom(state$, (_, state) => state),
    switchMap(handleUpload),
    mapTo(uploadComplete()),
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
     * I get it. In sotware enginnering, imposing smart restrictions yields
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
    filter(([previousState]) => previousState.editorState.uploadState === UploadState.COMPLETE),
    mapTo(resetUploadState()),
  );

  return merge(handleUpload$, reset$);
};

export default upload$;
