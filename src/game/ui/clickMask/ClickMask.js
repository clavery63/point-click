import React from 'react';
import { connect } from 'react-redux';
import { Rect } from 'shared/components/tappables';


const ClickMask = ({ shouldShow, onClick }) => {
  if (!shouldShow) {
    return null;
  }

  return (
    <Rect width={256} height={240} onClick={onClick} />
  );
};

const mapStateToProps = ({ text, worldState, playerState }) => {
  const room = worldState.rooms[playerState.room];
  const shouldShow = !!text || !!room.gameOver
  return { 
    shouldShow
  };
};

const mapDispatchToProps = {
  onClick: () => ({ type: 'PAGE_CLICK' })
};

export default connect(mapStateToProps, mapDispatchToProps)(ClickMask);
