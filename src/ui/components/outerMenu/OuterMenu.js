import React from 'react';
import { Rect } from 'react-konva';
import Text from '../shared/Text';

const KEY = 'doublehamburger-save-data';

const Start = ({ onClick }) => (
  <>
    <Text left={50} top={50} color={'light'} text={'start game'} />
    <Rect x={50} y={50} height={8} width={80} onClick={onClick} />
  </>
);

const Load = ({ onClick }) => (
  <>
    <Text left={50} top={60} color={'light'} text={'load game'} />
    <Rect x={50} y={60} height={8} width={80} onClick={onClick} />
  </>
);

const Unavailable = () => (
  <Text left={50} top={50} color={'light'} text={'currently unavailable'} />
);

const OuterMenu = ({ menu, onStartClick, onLoadClick }) => {
  if (menu === 'NONE') return null;

  const canStart = true;
  const loadData = !!window.localStorage.getItem(KEY);

  return (
    <>
      {!canStart && <Unavailable />}
      {canStart && <Start onClick={onStartClick} />}
      {canStart && loadData && <Load onClick={onLoadClick} />}
    </>
  );
};

export default OuterMenu;
