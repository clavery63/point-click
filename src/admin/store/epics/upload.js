import { ofType } from 'redux-observable';
import { switchMap, mapTo, withLatestFrom } from 'rxjs/operators';
import S3 from 'shared/util/S3';

const handleUpload = async state => {
  const s3 = new S3(state.gameName);
  return s3.writeObject('gamedata.json', JSON.stringify(state.gameState))
};

const upload$ = (action$, state$) => {
  return action$.pipe(
    ofType('UPLOAD_GAME'),
    withLatestFrom(state$, (_, state) => state),
    switchMap(handleUpload),
    mapTo(({ type: 'UPLOAD_COMPLETE'}))
  );
};

export default upload$;
