const sceneryReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return action.payload.worldState.scenery;
    case 'SET_SCENERY_POSITION':
      const oldScenery = state[action.payload.id];
      return {
        ...state,
        [action.payload.id]: {
          ...oldScenery,
          [action.payload.field]: {
            ...oldScenery[action.payload.field],
            left: action.payload.x,
            top: action.payload.y,
          }
        }
      }
    case 'SET_SCENERY_SIZE':
      // TODO: resize should also use SET_SCENERY_POSITION
      const oldScenery2 = state[action.payload.id];
      return {
        ...state,
        [action.payload.id]: {
          ...oldScenery2,
          startPosition: {
            ...oldScenery2.startPosition,
            width: action.payload.width,
            height: action.payload.height,
          }
        }
      }
    default:
      return state;
  }
};

export default sceneryReducer;
