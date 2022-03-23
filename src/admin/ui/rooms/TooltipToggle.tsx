import { setTooltipEnabled } from 'admin/store/reducers/editorStateReducer/tooltipsReducer';
import React from 'react';
import { useDispatch, useSelector } from '../hooks/redux';
import Toggle from '../shared/Toggle';

const TooltipToggle = () => {
  const dispatch = useDispatch();
  const tooltipsEnabled = useSelector(state => state.editorState.tooltips);

  return (
    <Toggle
      value={tooltipsEnabled}
      onChange={val => dispatch(setTooltipEnabled(val))}
      label="enable tooltips"
      tooltip="And this, my friend, is a tooltip toggle tooltip"
    />
  );
};

export default TooltipToggle;
