import { map, switchMap } from 'rxjs/operators';
import { forkJoin, from, of } from 'rxjs';
import getFilenames from 'shared/util/getFilenames';
import { flatten } from 'lodash';
import S3 from '../util/S3';
import image$ from './image';

const loadImagesFromBucket$ = (s3: S3, prefix: string) => {
  return from(s3.listObjects()).pipe(
    switchMap(objects => {
      const imageKeys = getFilenames(objects || [], `${prefix}img/(.*).png`);

      if (!imageKeys.length) {
        return of([]);
      }

      return forkJoin(imageKeys.map(imageKey => {
        return image$(s3, imageKey, prefix).pipe(
          map<HTMLImageElement, [string, HTMLImageElement]>(image => [imageKey, image]),
        );
      }));
    }),
  );
};

const loadImages$ = (gameKey: string) => {
  const s3 = new S3(`${gameKey}/img`);
  const sharedS3 = new S3('img', process.env.REACT_APP_SHARED_BUCKET);

  return forkJoin([
    loadImagesFromBucket$(s3, `${gameKey}/`),
    loadImagesFromBucket$(sharedS3, ''),
  ]).pipe(
    map(pairs => new Map(flatten(pairs))),
  );
};

export default loadImages$;
