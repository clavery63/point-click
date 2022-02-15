import React from 'react';
import { Image, Group } from 'react-konva';
import { useDispatch, useSelector } from 'shared/hooks';
import Transition from '../transition/Transition';
import Door from './Door';
import Item from './Item';
import Scenery from './Scenery';
import Video from '../shared/Video';
import viewportSelector from './viewportSelector';

// TODO: derive the gameName part from state
const videoAssetsRoot = `${process.env.REACT_APP_ASSETS_BASE}/test-game/video`;

type BGProps = {
  image?: HTMLImageElement;
  video?: string;
};
const Background = React.memo(({ image, video }: BGProps) => {
  if (video) {
    return <Video src={`${videoAssetsRoot}/${video}`} />;
  }

  return <Image width={112} height={112} image={image} />;
});

const Viewport = () => {
  const dispatch = useDispatch();
  const {
    borderImg,
    roomImg,
    doors,
    items,
    scenery,
    video,
  } = useSelector(viewportSelector);

  const onEntityClick = (id: number) => dispatch({
    type: 'SELECT_OBJECT',
    payload: id,
  });

  return (
    <Group x={8} y={23}>
      <Image width={128} height={128} image={borderImg} />
      <Group x={8} y={8}>
        <Background image={roomImg} video={video} />
        <Group>
          {doors.map(door => (
            <Door
              key={door.id}
              object={door}
              onClick={(id: number) => dispatch({
                type: 'SELECT_DOOR',
                payload: id,
              })}
            />
          ))}
        </Group>
        <Group>
          {items.map(item => (
            <Item
              key={item.id}
              object={item}
              onClick={onEntityClick}
            />
          ))}
        </Group>
        <Group>
          {scenery.map(sceneryObject => (
            <Scenery
              key={sceneryObject.id}
              object={sceneryObject}
              onClick={onEntityClick}
            />
          ))}
        </Group>
      </Group>
      <Transition />
    </Group>
  );
};

export default Viewport;
