import React from 'react';
import { useDispatch } from 'react-redux';
import useEntityDragger from './useEntityDragger';

const Draggable = ({ children, position, id, type, field }) => {
  const dispatch = useDispatch();
  const dragProps = useEntityDragger(position, (x, y) => {
    dispatch({
      type: `SET_${type}_POSITION`,
      payload: {
        field,
        id,
        x,
        y
      }
    })
  });

  return (
    <div {...dragProps}>
      {children}
    </div>
  );
};

Draggable.defaultProps = {
  field: 'position'
};

export default Draggable;
