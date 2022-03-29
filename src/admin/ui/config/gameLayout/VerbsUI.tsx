import { useSelector } from 'admin/ui/hooks/redux';
import { TextStateless as Text, makeCanvasSet } from 'game/ui/shared/Text';
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
  const verbs = useSelector(state => state.gameState.config.verbs);
  const images = useSelector(state => state.gameState.images);
  const canvases = useSelector(canvasesSelector);

  return (
    <Group x={left} y={top} draggable onClick={() => console.log(verbs[index])}>
      <Image image={images['menu-button']} />
      <Text text={verbs[index].name} left={9} top={1} canvases={canvases} />
    </Group>
  );
};

const VerbsUI = () => {
  const { verbs } = useSelector(state => state.gameState.config.positions);
  return (
    <Group>
      {verbs.map(({ left, top }, index) => (
        <Verb left={left} top={top} index={index} />
      ))}
    </Group>
  );
};

export default VerbsUI;
