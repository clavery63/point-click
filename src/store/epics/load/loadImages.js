import { map, switchMap } from 'rxjs/operators';
import { Observable, forkJoin, from } from 'rxjs';
import { ListObjectsCommand } from '@aws-sdk/client-s3';
import getS3 from './getS3';

const imgBase = 'https://d1r480m6ifdvvq.cloudfront.net/test-game/img';

const image$ = src => new Observable(observer => {
  const image = new Image();
  const load = () => {
    observer.next(image);
    observer.complete();
  };
  const error = e => {
    console.error(e);
    observer.error(e);
  }
  image.addEventListener('load', load);
  image.addEventListener('error', error);
  image.src = src;
  return () => {
    image.removeEventListener('load', load);
    image.removeEventListener('error', error);
  }
});

const withImages = state => pairs => ({
  ...state,
  images: pairs.reduce((obj, [key, value]) => ({
    ...obj,
    [key]: value
  }), {})
});

const listImages = async root => {
  const s3 = getS3();
  const data = await s3.send(
    new ListObjectsCommand({ 
      Delimiter: `/`, 
      Prefix: `${root}/img/`,
      Bucket: 'point-click-games'
    })
  );
  return data;
};

const getFilenames = (contents, root) => contents
  .map(({ Key }) => Key.match(new RegExp(`${root}/img/(.*).png`)))
  .filter(Boolean)
  .map(result => result[1]);

const loadImages$ = state => from(listImages('test-game')).pipe(
  switchMap(({ Contents }) => {
    const imageFiles = getFilenames(Contents, 'test-game');
    return forkJoin(imageFiles.map(key => {
      return image$(`${imgBase}/${key}.png`).pipe(map(image => [key, image]));
    })).pipe(map(withImages(state)));
  })
);

export default loadImages$;
