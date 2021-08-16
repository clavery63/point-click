import { Observable } from 'rxjs';

const retrieveImage = async (s3, imageKey, gameKey) => {
  const key = `${gameKey}/${imageKey}`;
  const localImage = localStorage.getItem(key);
  if (localImage) {
    return [Uint8Array.from(localImage.split(','))];
  }

  const s3Image = await s3.getObject(`${imageKey}.png`);
  localStorage.setItem(key, s3Image.join(','));

  return s3Image;
};

const image$ = (s3, imageKey, gameKey) => new Observable(observer => {
  const load = () => {
    observer.next(image);
    observer.complete();
  };

  const error = e => {
    console.error(e);
    observer.error(e);
  }
  
  const image = new Image();
  retrieveImage(s3, imageKey, gameKey).then(byteArray => {
    image.src = URL.createObjectURL(new Blob(byteArray));
  }).catch(e => error(e));

  image.addEventListener('load', load);
  image.addEventListener('error', error);
  return () => {
    image.removeEventListener('load', load);
    image.removeEventListener('error', error);
  }
});

export default image$;
