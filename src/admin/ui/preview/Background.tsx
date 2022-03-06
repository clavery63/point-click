import React, { useEffect } from 'react';
import { Image } from 'shared/components/tappables';
import { clearSelected, SelectedEntity } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { Nullable, Room } from 'game/store/types';
import Video from 'game/ui/shared/Video';
import { useSelector, useDispatch } from '../hooks/redux';

// TODO: derive the gameName part from state
const videoAssetsRoot = `${process.env.REACT_APP_ASSETS_BASE}/test-game/video`;

type BackgroundProps = {
  room: Room;
  selectedEntity: Nullable<SelectedEntity>;
};
const Background = ({ room, selectedEntity }: BackgroundProps) => {
  const dispatch = useDispatch();
  const { img, video } = room;
  const image = useSelector(state => state.gameState.images[img || '']);
  const opacity = selectedEntity ? 0.5 : 1;

  const clear = () => {
    dispatch(clearSelected());
  };

  useEffect(() => clear, []);

  if (video) {
    return (
      <Video
        src={`${videoAssetsRoot}/${video}`}
        opacity={opacity}
        onClick={clear}
        muted
      />
    );
  }

  return (
    <Image
      width={112}
      height={112}
      image={image}
      opacity={opacity}
      onClick={clear}
    />
  );
};

export default Background;
