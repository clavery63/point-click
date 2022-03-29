import { setVerbPosition } from 'admin/store/reducers/gameStateReducer/configReducer/positionsReducer';
import { useSelector, useDispatch } from 'admin/ui/hooks/redux';
import useCachebuster from 'admin/ui/hooks/useCachebuster';
import { TextStateless as Text, makeCanvasSet } from 'game/ui/shared/Text';
import { KonvaEventObject } from 'konva/types/Node';
import React from 'react';
import { Group, Image } from 'react-konva';
import { createSelector } from 'reselect';

const canvasesSelector = createSelector(
  // TODO: fix the "any" type here
  (state: any) => state.gameState.images,
  (images) => {
    const charSet = images['alpha-dark'];
    return charSet ? makeCanvasSet(charSet) : undefined;
  },
);

type Props = {
  top: number;
  left: number;
  index: number;
};
const Verb = (props: Props) => {
  const { top, left, index } = props;
  const dispatch = useDispatch();
  const verbs = useSelector(state => state.gameState.config.verbs);
  const images = useSelector(state => state.gameState.images);
  const canvases = useSelector(canvasesSelector);
  const cachebuster = useCachebuster(top + left);

  return (
    <Group
      x={left + cachebuster}
      y={top + cachebuster}
      draggable
      onClick={() => console.log(verbs[index])}
      onDragEnd={(e: KonvaEventObject<DragEvent>) => {
        dispatch(setVerbPosition({
          top: Math.round(e.target.y()),
          left: Math.round(e.target.x()),
          index,
        }));
      }}
    >
      <Image image={images['menu-button']} />
      <Text text={verbs[index].name} left={9} top={1} canvases={canvases} />
    </Group>
  );
};

const VerbsUI = () => {
  const { verbs = [] } = useSelector(state => state.gameState.config.positions);
  return (
    <Group>
      {verbs.map(({ left, top }, index) => (
        <Verb left={left} top={top} index={index} key={index} />
      ))}
    </Group>
  );
};

export default VerbsUI;
