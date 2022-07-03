import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});

const documentClient = DynamoDBDocument.from(client);

// eslint-disable-next-line import/prefer-default-export
export async function handler(event, context, callback) {
  const hashedPW = await bcrypt.hash(event.pw, 10);
  const result = await documentClient.put({
    TableName: 'point-click-games',
    Item: {
      id: uuidv4(),
      name: event.name,
      pw: hashedPW,
    },
  });

  console.log('result:', result);

  callback(null, {
    statusCode: 200,
  });
}
