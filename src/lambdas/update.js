/* eslint-disable import/extensions */
import bcrypt from 'bcryptjs';
import documentClient from './documentClient.js';
import queryByName from './queryByName.js';

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  const yo = await queryByName(event.name) || {};

  console.log('yo:', yo);

  const { id } = yo;

  if (!id) {
    return {
      statusCode: 404,
    };
  }

  const hashedPW = await bcrypt.hash(event.pw, 10);

  const result = documentClient.update({
    TableName: 'point-click-games',
    Key: {
      id,
    },
    UpdateExpression: 'set pw = :pw',
    ExpressionAttributeValues: {
      ':pw': hashedPW,
    },
  });

  console.log('result:', result);

  return {
    statusCode: 200,
  };
}
