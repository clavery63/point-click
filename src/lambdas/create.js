/* eslint-disable import/extensions */
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import documentClient from './documentClient.js';
import queryByName from './queryByName.js';

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  const { id } = await queryByName(event.name) || {};
  if (id) {
    return {
      statusCode: 200,
    };
  }

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

  return {
    statusCode: 201,
  };
}
