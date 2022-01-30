import { Rect as KonvaRect, Image as KonvaImage } from 'react-konva';
import React from 'react';
import { KonvaEventObject } from 'konva/types/Node';

interface OuterProps {
  onClick?: (evt: KonvaEventObject<MouseEvent>) => void;
};

const tappable = <Props extends OuterProps>(
  Component: React.FC<Props>
) => {
  return React.forwardRef<typeof Component, Props>((outerProps, ref) => (
    <Component
      {...outerProps}
      ref={ref}
      onTouchEnd={outerProps.onClick}
    />
  ));
};

export const Rect = tappable(KonvaRect);
export const Image = tappable(KonvaImage);
