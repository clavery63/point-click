import React from 'react';
import { Rect } from 'react-konva';
import Text from '../shared/Text';

const OuterMenu = ({ menu, onStartClick }) => {
  if (menu === 'NONE') return null;

  const canStart = window.location.search.indexOf('giantsfumble') > -1;
  const text = canStart ? 'start game' : 'currently unavailable';
  const onClick = canStart ? onStartClick : () => {};

  return (
    <>
      <Text left={50} top={50} color={'light'} text={text} />
      <Rect x={50} y={50} height={8} width={40} onClick={onClick} />
    </>
  );
};

export default OuterMenu;
