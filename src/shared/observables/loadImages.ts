import { map, switchMap } from 'rxjs/operators';
import { forkJoin, from } from 'rxjs';
import { _Object } from '@aws-sdk/client-s3';
import S3 from '../util/S3';
import image$ from './image';

const getFilenames = (objects: _Object[], gameKey: string) => objects
  .map(({ Key }) => Key?.match(new RegExp(`${gameKey}/img/(.*).png`)))
  .map(result => (result && result[1]) as string) // <--trypescript fail
  .filter(Boolean);

const loadImages$ = (gameKey: string) => {
  const s3 = new S3(`${gameKey}/img`);
  return from(s3.listObjects()).pipe(
    switchMap(objects => {
      const imageKeys = getFilenames(objects || [], gameKey);
      return forkJoin(imageKeys.map(imageKey => {
        return image$(s3, imageKey, gameKey).pipe(
          map<HTMLImageElement, [string, HTMLImageElement]>(image => [imageKey, image]),
        );
      }));
    }),
    map(pairs => new Map(pairs)),
  );
};

export default loadImages$;
