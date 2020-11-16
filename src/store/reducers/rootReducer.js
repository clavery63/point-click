const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_STATE':
      return payload;
    case 'SET_TEXT':
      return { ...state, text: payload  };
    case 'CLEAR_NEXT_TEXT':
      return { ...state, nextText: null };
    case 'MENU_OPTION':
      return { 
        ...state,
        menuOption: payload,
        nextText: 'Where would you like to move?'
      };
    case 'OBJECT_CLICK':
      console.log('OBJECT:', payload);
      return state;
    case 'DOOR':
      console.log('DOOR:', payload);
      return state;
    default:
      return state;
  }
};

export default reducer;
