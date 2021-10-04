import React from 'react';
import styles from './Admin.module.css';
import GamePreview from './ui/preview/GamePreview';

const AdminContainer = ({ children }) => {
  return (
    <div className={styles.adminContainer}>
      <GamePreview />
      {children}
    </div>
  );
};

export default AdminContainer;
