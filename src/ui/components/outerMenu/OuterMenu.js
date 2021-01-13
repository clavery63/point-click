import React from 'react';
import { Rect } from 'react-konva';
import Text from '../shared/Text';

const OuterMenu = ({ menu, onStartClick }) => {
  if (menu === 'NONE') return null;

  return (
    <>
      <Text left={50} top={50} color={'light'} text={'start game'} />
      <Rect x={50} y={50} height={8} width={40} onClick={onStartClick} />
    </>
  );
};

export default OuterMenu;
