import React from 'react';
import styles from './Admin.module.css';
import GamePreview from './ui/preview/GamePreview';

type Props = {
  children: React.ReactNode;
};
const AdminContainer = ({ children }: Props) => {
  return (
    <div className={styles.adminContainer}>
      <GamePreview />
      {children}
    </div>
  );
};

export default AdminContainer;
