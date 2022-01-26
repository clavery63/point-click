import { Rect as KonvaRect, Image as KonvaImage } from 'react-konva';
import React from 'react';
import { KonvaEventObject } from 'konva/types/Node';

interface MyGuys {
  onClick?: (evt: KonvaEventObject<MouseEvent>) => void;
};

const tappable = <Props extends MyGuys>(
  Component: React.FC<Props>
) => {
  const MyHoc = React.forwardRef<typeof Component, Props>((outerProps, ref) => {
    return (
      <Component
        {...outerProps}
        ref={ref}
        onTouchEnd={outerProps.onClick}
      />
    )
  });

  return MyHoc;
};

export const Rect = tappable(KonvaRect);
export const Image = tappable(KonvaImage);
