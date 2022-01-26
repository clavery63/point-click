import { AllActions } from 'game/store/epics/types';
import { GameStoreState } from 'game/store/types';
import { Dispatch } from 'react';
import { 
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';

export const useDispatch = () => useReduxDispatch<Dispatch<AllActions>>();
export const useSelector: TypedUseSelectorHook<GameStoreState> = useReduxSelector;
