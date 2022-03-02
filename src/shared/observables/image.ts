import { Observable } from 'rxjs';
import S3 from 'shared/util/S3';

const retrieveImage = async (s3: S3, imageKey: string, prefix: string) => {
  const key = `${prefix}${imageKey}`;
  const localImage = localStorage.getItem(key);
  if (localImage) {
    return [Uint8Array.from(localImage.split(',').map(num => parseInt(num, 10)))];
  }

  // TODO: the aws-sdk library size is ridiculous. When we create a custom
  // bundle to ship games, let's use plain old fetch to get these. Might need
  // to adust to a different data format.
  const s3Image = await s3.getObject(`${imageKey}.png`);
  localStorage.setItem(key, s3Image.join(','));

  return s3Image;
};

const image$ = (s3: S3, imageKey: string, prefix: string) => {
  return new Observable<HTMLImageElement>(observer => {
    const image = new Image();

    const load = () => {
      observer.next(image);
      observer.complete();
    };

    const error = (e: ErrorEvent) => {
      console.error(e);
      observer.error(e);
    };

    retrieveImage(s3, imageKey, prefix).then(byteArray => {
      image.src = URL.createObjectURL(new Blob(byteArray));
    }).catch(e => error(e));

    image.addEventListener('load', load);
    image.addEventListener('error', error);
    return () => {
      image.removeEventListener('load', load);
      image.removeEventListener('error', error);
    };
  });
};

export default image$;
