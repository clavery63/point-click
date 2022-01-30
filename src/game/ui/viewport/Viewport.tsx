import React from 'react';
import { Image, Group } from 'react-konva';
import { useDispatch, useSelector } from 'shared/hooks';
import { EntityType } from 'game/store/types';
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
const Background = ({ image, video }: BGProps) => {
  if (video) {
    // TODO: whoa, is this rendering on every cursor and text update? This should get
    // its own connected component, but also lets get those out of redux
    return <Video src={`${videoAssetsRoot}/${video}`} />;
  }

  return <Image width={112} height={112} image={image} />;
};

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

  const onClick = (id: number, type: EntityType) => dispatch({
    type: 'SELECT_OBJECT',
    payload: { id, type },
  });

  return (
    <Group x={8} y={23}>
      <Image width={128} height={128} image={borderImg} />
      <Group x={8} y={8}>
        <Background image={roomImg} video={video} />
        {/* TODO: I had a hell of a time trying to deduplicate this code here in
            typescript. I'm sure it's possible; my brain just can't handle it
            right now */}
        <Group>
          {doors.map(door => (
            <Door
              key={door.id}
              object={door}
              onClick={onClick}
            />
          ))}
        </Group>
        <Group>
          {items.map(item => (
            <Item
              key={item.id}
              object={item}
              onClick={onClick}
            />
          ))}
        </Group>
        <Group>
          {scenery.map(sceneryObject => (
            <Scenery
              key={sceneryObject.id}
              object={sceneryObject}
              onClick={onClick}
            />
          ))}
        </Group>
      </Group>
      <Transition />
    </Group>
  );
};

export default Viewport;
