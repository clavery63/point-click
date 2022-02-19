import { _Object } from '@aws-sdk/client-s3';

const getFilenames = (objects: _Object[], regex: string) => objects
  .map(({ Key }) => Key?.match(new RegExp(regex)))
  .map(result => (result && result[1]) as string) // <--typescript fail
  .filter(Boolean);

export default getFilenames;
