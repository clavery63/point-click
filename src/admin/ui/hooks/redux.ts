import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'admin/store/reducers/rootReducer';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';

/**
 * TODO: hopefully remove this hack. Basically, we are instantiating redux
 * stores within function calls rather than at the top level, which, well, maybe
 * we should try to combine the stores and not do that.
 *
 * But anyway, we need an instance of the store at the top level to help
 * typescript infer the hook types here, which newer redux leans heavily on,
 * somewhat sadly.
 */
const dummyStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof dummyStore.getState>;
type AppDispatch = typeof dummyStore.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
