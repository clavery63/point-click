const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'MAKE_RED':
      return { ...state, fillColor: 'red'  };
    case 'SET_WIDTH':
      return { ...state, width: payload  };
    case 'SET_TEXT':
      return { ...state, text: payload  };
    default:
      return state;
  }
};

export default reducer;
