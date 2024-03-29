import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ActionCreators } from 'redux-undo';
import styles from './Admin.module.css';
import { clearSelected } from './store/reducers/editorStateReducer/selectedEntityReducer';
import { useDispatch } from './ui/hooks/redux';
import useCommand from './ui/hooks/useCommand';
import GamePreview from './ui/preview/GamePreview';
import AdminHeader from './ui/shared/AdminHeader';

type Props = {
  children: React.ReactNode;
};
const AdminContainer = ({ children }: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useCommand('z', () => dispatch(ActionCreators.undo()));
  useCommand('y', () => dispatch(ActionCreators.redo()));

  useEffect(() => {
    const unlisten = history.listen(() => {
      dispatch(clearSelected());
    });

    return unlisten;
  }, []);

  return (
    <div className={styles.adminContainer}>
      <GamePreview />
      <AdminHeader />
      {children}
    </div>
  );
};

export default AdminContainer;
