import React from 'react';
import { Rect } from 'shared/components/tappables';
import Text, { Color, getTextLeft } from './Text';

const charWidth = 8;

type Props = {
  left: number | 'centered';
  top: number;
  color: Color;
  text: string;
  onClick: () => void;
};
const ClickText = (props: Props) => {
  const {
    left: leftProp, top, color, text, onClick,
  } = props;
  const width = text.length * charWidth;
  const left = getTextLeft(leftProp, text.length);

  return (
    <>
      <Text left={left} top={top} color={color} text={text} />
      <Rect x={left} y={top} height={8} width={width} onClick={onClick} />
    </>
  );
};

export default ClickText;
