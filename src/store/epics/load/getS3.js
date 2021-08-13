import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool} from '@aws-sdk/credential-provider-cognito-identity';
import { S3Client } from '@aws-sdk/client-s3';

const getS3 = () => {
  const REGION = 'us-east-1';
  return new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: REGION }),
      // TODO: squash this out and move to .env
      identityPoolId: 'us-east-1:a8a34384-deba-4a16-9eed-53bdaef411c0',
    }),
  });
};

export default getS3;
