import { GameStoreState } from 'game/store/types';
import { Stage } from 'konva/types/Stage';
import { Vector2d } from 'konva/types/types';
import React, { useState, useEffect } from 'react';
import { Image } from 'react-konva';
import { useSelector } from 'shared/hooks';
import cursor$ from './cursorStream';

export interface StageData { 
  stage: Stage;
  scaleX: number;
  scaleY: number;
}

const cursorSelector = ({ cursorEnabled, images }: GameStoreState) => {
  return {
    cursorEnabled,
    cursorImg: images.get('cursor')
  };
}

type Props = {
  stageData: StageData;
};

const Cursor = ({ stageData }: Props) => {
  const { cursorEnabled, cursorImg } = useSelector(cursorSelector);
  const [position, setPosition] = useState<Vector2d | null>(null);

  useEffect(() => {
    const subscription = cursor$(stageData).subscribe(newPosition => {
      setPosition(newPosition);
    });

    return () => subscription.unsubscribe();
  }, [stageData])

  if (!position) {
    return null;
  }

  return (
    <Image
      width={9}
      height={16}
      x={position?.x - 3}
      y={position?.y - 1}
      image={cursorEnabled ? cursorImg : undefined}
      listening={!cursorEnabled}
    />
  );
};

export default Cursor;
