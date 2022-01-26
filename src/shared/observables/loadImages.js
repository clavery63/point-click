import { map, switchMap } from 'rxjs/operators';
import { forkJoin, from } from 'rxjs';
import S3 from '../util/S3';
import image$ from '../observables/image';

const getFilenames = (objects, gameKey) => objects
  .map(({ Key }) => Key.match(new RegExp(`${gameKey}/img/(.*).png`)))
  .filter(Boolean)
  .map(result => result[1]);

const loadImages$ = gameKey => {
  const s3 = new S3(`${gameKey}/img`);
  return from(s3.listObjects()).pipe(
    switchMap(objects => {
      const imageKeys = getFilenames(objects, gameKey);
      return forkJoin(imageKeys.map(imageKey => {
        return image$(s3, imageKey, gameKey).pipe(
          map(image => [imageKey, image])
        );
      }));
    }),
    map(pairs => new Map(pairs))
  );
};

export default loadImages$;
