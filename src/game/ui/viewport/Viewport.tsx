import React from 'react';
import { Image, Group } from 'react-konva';
import { useDispatch, useSelector } from 'shared/hooks';
import { Entity } from 'game/store/types';
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

type EntityProps = { entity: Entity; onClick: (id: number) => void };
const EntityComponent = (props: EntityProps) => {
  const { entity, onClick } = props;
  if (entity.type === 'items') {
    return <Item item={entity} onClick={onClick} />;
  }
  if (entity.type === 'scenery') {
    return <Scenery scenery={entity} onClick={onClick} />;
  }

  // unreachable. potentially add doors to the mix here
  return null;
};

const Viewport = () => {
  const dispatch = useDispatch();
  const {
    borderImg,
    roomImg,
    doors,
    entities,
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
              door={door}
              onClick={(id: number) => dispatch({
                type: 'SELECT_DOOR',
                payload: id,
              })}
            />
          ))}
        </Group>
        <Group>
          {entities.map(entity => (
            <EntityComponent
              key={entity.id}
              entity={entity}
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
