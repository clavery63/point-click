import { map, switchMap } from 'rxjs/operators';
import { Observable, forkJoin, from } from 'rxjs';
import { ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import getS3 from './getS3';

const getStreamContent = async stream => {
  const reader = stream.getReader();
  const readBytes = async bytes => {
    const { done, value } = await reader.read();
    if (done) {
      return bytes;
    }
    return readBytes([...bytes, value]);
  };

  return await readBytes([]);
};

const image$ = (s3, gameKey, imageKey) => new Observable(observer => {
  const image = new Image();
  s3.send(new GetObjectCommand({
    Bucket: 'point-click-games',
    Key: `${gameKey}/img/${imageKey}.png`
  }))
  .then(({ Body }) => getStreamContent(Body))
  .then(byteArray => {
    image.src = URL.createObjectURL(new Blob(byteArray));
  })
  .catch(e => {
    console.error(e);
    observer.error(e);
  })

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

const listImages = async (s3, gameKey) => {
  const data = await s3.send(
    new ListObjectsCommand({ 
      Delimiter: `/`,
      Prefix: `${gameKey}/img/`,
      Bucket: 'point-click-games'
    })
  );
  return data;
};

const getFilenames = (contents, gameKey) => contents
  .map(({ Key }) => Key.match(new RegExp(`${gameKey}/img/(.*).png`)))
  .filter(Boolean)
  .map(result => result[1]);

const loadImages$ = gameKey => state => {
  const s3 = getS3();
  return from(listImages(s3, gameKey)).pipe(
    switchMap(({ Contents }) => {
      const imageKeys = getFilenames(Contents, gameKey);
      return forkJoin(imageKeys.map(imageKey => {
        return image$(s3, gameKey, imageKey).pipe(map(image => [imageKey, image]));
      })).pipe(map(withImages(state)));
    })
  );
}

export default loadImages$;
