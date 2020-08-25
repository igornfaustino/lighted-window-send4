import React, { useMemo } from 'react';
import Window from './Window';
import styles from './Building.module.scss';

interface props {
  numberOfWindows?: number;
}

const Building: React.FC<props> = ({ numberOfWindows = 0 }) => {
  const windows = useMemo(() => {
    const elements = [];
    for (let index = 0; index < numberOfWindows; index++) {
      elements.push(<Window key={index} />);
    }
    return elements;
  }, [numberOfWindows]);

  return (
    <div className={styles.building}>
      <div className={styles.windows}>{windows}</div>
    </div>
  );
};

export default Building;
