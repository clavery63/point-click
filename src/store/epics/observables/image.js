import { Observable } from 'rxjs';

const image$ = (s3, imageKey) => new Observable(observer => {
  const load = () => {
    observer.next(image);
    observer.complete();
  };

  const error = e => {
    console.error(e);
    observer.error(e);
  }
  
  const image = new Image();
  s3.getObject(`${imageKey}.png`).then(byteArray => {
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
