import React from 'react';
import { Image } from 'react-konva';
import { connect } from 'react-redux';

const SHEET_WIDTH = 5;
const SPRITE_WIDTH = 16;
const SPRITE_HEIGHT = 20;

const Bag = ({ bagImg, onClick, bagLevel }) => {
  return (
    <Image
      x={88}
      y={8}
      width={SPRITE_WIDTH}
      height={SPRITE_HEIGHT}
      image={bagImg}
      onClick={() => onClick(bagLevel)}
      crop={{ 
        x: (bagLevel % SHEET_WIDTH) * SPRITE_WIDTH,
        y: Math.floor(bagLevel / SHEET_WIDTH) * SPRITE_HEIGHT,
        width: SPRITE_WIDTH, 
        height: SPRITE_HEIGHT 
      }}
    />
  );
};

const mapStateToProps = ({ gameState, playerState }) => {
  return {
    bagImg: gameState.images.bag,
    bagLevel: playerState.bagLevel
  };
};

const mapDispatchToProps = {
  onClick: bagLevel => ({ type: 'SELECT_BAG', payload: bagLevel })
};

export default connect(mapStateToProps, mapDispatchToProps)(Bag);
