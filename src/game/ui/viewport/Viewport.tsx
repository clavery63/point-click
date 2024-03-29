import React from 'react';
import { Image, Group, Rect } from 'react-konva';
import { useDispatch, useSelector } from 'shared/hooks/redux';
import { Entity } from 'game/store/types';
import { getVideoPath } from 'shared/util/getAssetsPath';
import Transition from '../transition/Transition';
import Door from './Door';
import Item from './Item';
import Scenery from './Scenery';
import Video from '../shared/Video';
import viewportSelector from './viewportSelector';

type BGProps = {
  image?: HTMLImageElement;
  video?: string;
  gameName: string;
};
const Background = React.memo(({ image, video, gameName }: BGProps) => {
  if (video) {
    return <Video src={`${getVideoPath(gameName)}/${video}`} />;
  }

  return <Image width={112} height={112} image={image} />;
});

const Border = () => {
  const images = useSelector(state => state.images);
  const bgColor = useSelector(state => state.config.colors.background);
  return (
    <Group>
      <Rect width={128} height={128} fill={bgColor} />
      <Image width={128} height={128} image={images.get('border')} />
    </Group>
  );
};

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
    roomImg,
    doors,
    entities,
    video,
    gameName,
  } = useSelector(viewportSelector);

  const onEntityClick = (id: number) => dispatch({
    type: 'SELECT_OBJECT',
    payload: id,
  });

  return (
    <Group x={8} y={23}>
      <Border />
      <Group x={8} y={8}>
        <Background image={roomImg} video={video} gameName={gameName} />
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
