import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import {
  S3Client, ListObjectsCommand, GetObjectCommand, PutObjectCommand,
} from '@aws-sdk/client-s3';

/**
 * README:
 *
 * Strongly typing this is a mess because of all of the shitty AWS interfaces
 * you have to deal with. I'd rather just treat this as unsafe and null check
 * everything that comes out of it :(
 */
class S3 {
  constructor(rootPath = '', bucketName = process.env.REACT_APP_GAMES_BUCKET) {
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
        Key: `${this.rootPath}/${key}`,
      }),
    );

    return S3.getStreamContent(Body);
  }

  async writeObject(key, data) {
    const result = await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: `${this.rootPath}/${key}`,
        Body: data,
      }),
    );
    return result;
  }

  async listObjects() {
    const { Contents } = await this.client.send(
      new ListObjectsCommand({
        Delimiter: '/',
        Prefix: `${this.rootPath}/`,
        Bucket: this.bucketName,
      }),
    );

    return Contents;
  }

  async listPrefixes() {
    const { CommonPrefixes } = await this.client.send(
      new ListObjectsCommand({
        Delimiter: '/',
        Prefix: '',
        Bucket: this.bucketName,
      }),
    );

    return CommonPrefixes.map(({ Prefix }) => Prefix.slice(0, Prefix.length - 1));
  }

  static async getStreamContent(stream) {
    const reader = stream.getReader();
    const readBytes = async bytes => {
      const { done, value } = await reader.read();
      if (done) {
        return bytes;
      }
      return readBytes([...bytes, value]);
    };

    return readBytes([]);
  }
}

export default S3;
