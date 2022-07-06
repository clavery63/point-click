// eslint-disable-next-line import/extensions
import documentClient from './documentClient.js';

const queryByName = async name => {
  const { Items } = await documentClient.query({
    TableName: 'point-click-games',
    IndexName: 'name-index',
    KeyConditionExpression: '#name = :name',
    ExpressionAttributeNames: { '#name': 'name' },
    ExpressionAttributeValues: {
      ':name': name,
    },
  });

  return Items[0];
};

export default queryByName;
