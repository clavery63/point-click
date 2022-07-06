/* eslint-disable import/extensions */
import bcrypt from 'bcryptjs';
import queryByName from './queryByName.js';

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  try {
    const { name, pw: newPw } = JSON.parse(event.body);
    const { pw: oldPw } = await queryByName(name) || {};

    let result = true;
    if (oldPw) {
      result = await bcrypt.compare(newPw, oldPw);
    }

    return {
      statusCode: 200,
      body: result,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
}
