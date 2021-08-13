import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool} from '@aws-sdk/credential-provider-cognito-identity';
import { S3Client, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3';

class S3 {
  constructor(rootPath, bucketName = process.env.REACT_APP_GAMES_BUCKET) {
    const region = 'us-east-1';
    this.rootPath = rootPath;
    this.bucketName = bucketName;
    this.client = new S3Client({
      region,
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region }),
        identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
      }),
    });
  }

  async getObject(key) {
    const { Body } = await this.client.send(
      new GetObjectCommand({
        Bucket: this.bucketName,
        Key: `${this.rootPath}/${key}`
      })
    );

    return this.getStreamContent(Body);
  }

  async listObjects() {
    return this.client.send(
      new ListObjectsCommand({ 
        Delimiter: `/`,
        Prefix: `${this.rootPath}/`,
        Bucket: this.bucketName
      })
    );
  };

  async getStreamContent(stream) {
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
}

export default S3;
