import { Rect as KonvaRect, Image as KonvaImage } from 'react-konva';
import React from 'react';

const tappable = Component => React.forwardRef((outerProps, ref) => {
  return (
    <Component
      {...outerProps}
      ref={ref}
      onTouchEnd={outerProps.onClick}
    />
  )
});

export const Rect = tappable(KonvaRect);
export const Image = tappable(KonvaImage);
