import { withText, setValue } from '../utils';

const itemReducer = item => state => {
  const { gameState, playerState } = state;
  const room = gameState.rooms[playerState.room];
  const newRoomItems = room.items.filter(id => id !== item.id);
  const newPlayerItems = [...playerState.items, item.id];
  return {
    ...state,
    gameState: setValue(`rooms.${playerState.room}.items`)(newRoomItems)(gameState),
    playerState: setValue('items')(newPlayerItems)(playerState),
    nextText: `The ${item.name} is in hand.`
  };
};

const takeReducer = object => {
  if (object.type === 'items') {
    return itemReducer(object);
  }
  if (object.type === 'doors') {
    return withText('Forget about it. You cannot take a door.');
  }
  return withText('Can\'t take it!');
};


export default takeReducer;
