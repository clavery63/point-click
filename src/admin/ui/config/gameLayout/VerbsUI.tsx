import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { setVerbPosition } from 'admin/store/reducers/gameStateReducer/configReducer/positionsReducer';
import { useSelector, useDispatch } from 'admin/ui/hooks/redux';
import { KonvaEventObject } from 'konva/types/Node';
import React from 'react';
import { Group } from 'react-konva';
import MenuButtonWidget from './MenuButtonWidget';

type Props = {
  top: number;
  left: number;
  index: number;
};
const Verb = (props: Props) => {
  const { top, left, index } = props;
  const dispatch = useDispatch();
  const verbs = useSelector(state => state.gameState.present.config.verbs);

  return (
    <MenuButtonWidget
      left={left}
      top={top}
      text={verbs[index].name}
      hasButton
      onClick={() => dispatch(setSelected({
        id: index,
        type: 'verbs',
      }))}
      onDrag={(e: KonvaEventObject<DragEvent>) => {
        dispatch(setVerbPosition({
          top: Math.round(e.target.y()),
          left: Math.round(e.target.x()),
          index,
        }));
      }}
    />
  );
};

const VerbsUI = () => {
  const { verbs = [] } = useSelector(state => state.gameState.present.config.positions);
  return (
    <Group>
      {verbs.map(({ left, top }, index) => (
        <Verb left={left} top={top} index={index} key={index} />
      ))}
    </Group>
  );
};

export default VerbsUI;
