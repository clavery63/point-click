/* eslint-disable import/extensions */
import bcrypt from 'bcryptjs';
import queryByName from './queryByName.js';

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  const { pw } = await queryByName(event.name) || {};

  let result = true;
  if (pw) {
    result = await bcrypt.compare(event.pw, pw);
  }

  return {
    statusCode: 200,
    body: result,
  };
}
