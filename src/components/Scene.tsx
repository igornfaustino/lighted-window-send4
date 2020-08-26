import React, { useContext, useMemo } from 'react';
import cx from 'classnames';
import styles from './Scene.module.scss';
import NightModeContext from '../contexts/NightModeContext';

interface props {
  children?: JSX.Element | JSX.Element[];
}

const Scene: React.FC<props> = ({ children }) => {
  const isNight = useContext(NightModeContext);

  const sceneClassnames = useMemo(() => {
    const classnames = [styles.scene];
    if (isNight) classnames.push(styles['dark-mode']);
    return cx(classnames);
  }, [isNight]);

  return (
    <div className={sceneClassnames} data-testid="scene">
      <div className={styles.cloud} />
      {children}
      <div className={styles.floor} />
    </div>
  );
};

export default Scene;
