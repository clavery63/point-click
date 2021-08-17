import React from 'react';
import styles from './Admin.module.css';
import GamePreview from './ui/preview/GamePreview';

const AdminContainer = ({ children }) => {
  return (
    <div className={styles.adminContainer}>
      <GamePreview />
      <div className={styles.rightColumn}>
        {children}
      </div>
    </div>
  );
};

export default AdminContainer;
