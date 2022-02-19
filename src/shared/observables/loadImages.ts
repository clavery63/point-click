import { map, switchMap } from 'rxjs/operators';
import { forkJoin, from } from 'rxjs';
import getFilenames from 'shared/util/getFilenames';
import S3 from '../util/S3';
import image$ from './image';

const loadImages$ = (gameKey: string) => {
  const s3 = new S3(`${gameKey}/img`);
  return from(s3.listObjects()).pipe(
    switchMap(objects => {
      const imageKeys = getFilenames(objects || [], `${gameKey}/img/(.*).png`);
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
