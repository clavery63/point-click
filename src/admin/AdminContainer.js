import React from 'react';
import { connect } from 'react-redux';
import styles from './Admin.module.css';
import GameRoot from '../game/GameRoot';

const AdminContainer = ({ children, gameName, showPreview }) => {
  return (
    <div className={styles.adminContainer}>
      {showPreview && (
        <div className={styles.leftColumn}>
          <div className={styles.gameWrapper}>
            <GameRoot gameName={gameName} />
          </div>
        </div>
      )}
      <div className={styles.rightColumn}>
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = ({ showPreview }) => ({ showPreview });

export default connect(mapStateToProps)(AdminContainer);
