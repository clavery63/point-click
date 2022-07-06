/* eslint-disable import/extensions */
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import documentClient from './documentClient.js';
import queryByName from './queryByName.js';

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  try {
    const { name, pw } = JSON.parse(event.body);
    const { id } = await queryByName(name) || {};
    if (id) {
      return {
        statusCode: 200,
      };
    }

    const hashedPW = await bcrypt.hash(pw, 10);
    const result = await documentClient.put({
      TableName: 'point-click-games',
      Item: {
        id: uuidv4(),
        name,
        pw: hashedPW,
      },
    });

    console.log('result:', result);

    return {
      statusCode: 201,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
}
