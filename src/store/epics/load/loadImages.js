import { map, switchMap } from 'rxjs/operators';
import { forkJoin, from } from 'rxjs';
import S3 from './S3';
import image$ from '../observables/image';

const withImages = state => pairs => ({
  ...state,
  images: pairs.reduce((obj, [key, value]) => ({
    ...obj,
    [key]: value
  }), {})
});

const getFilenames = (contents, gameKey) => contents
  .map(({ Key }) => Key.match(new RegExp(`${gameKey}/img/(.*).png`)))
  .filter(Boolean)
  .map(result => result[1]);

const loadImages$ = gameKey => state => {
  const s3 = new S3(`${gameKey}/img`);
  return from(s3.listObjects()).pipe(
    switchMap(({ Contents }) => {
      const imageKeys = getFilenames(Contents, gameKey);
      return forkJoin(imageKeys.map(imageKey => {
        return image$(s3, imageKey).pipe(map(image => [imageKey, image]));
      })).pipe(map(withImages(state)));
    })
  );
}

export default loadImages$;
