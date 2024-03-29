import { GameStoreState, Nullable } from 'game/store/types';
import { Vector2d } from 'konva/types/types';
import React, { useState, useEffect } from 'react';
import { Image, Stage } from 'react-konva';
import { useSelector } from 'shared/hooks/redux';
import cursor$ from './cursorStream';

export interface StageData {
  stage: Nullable<typeof Stage>;
  scaleX: number;
  scaleY: number;
}

const cursorSelector = ({ cursorEnabled, images, config }: GameStoreState) => {
  const cursorName = config.img.cursor || 'cursor';
  return {
    cursorEnabled,
    cursorImg: images.get(cursorName),
  };
};

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
  }, [stageData]);

  if (!position) {
    return null;
  }

  return (
    <Image
      width={cursorImg?.width}
      height={cursorImg?.height}
      x={position.x - 3}
      y={position.y - 1}
      image={cursorEnabled ? cursorImg : undefined}
      listening={!cursorEnabled}
    />
  );
};

export default Cursor;
