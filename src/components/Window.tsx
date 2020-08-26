import React, { useState, useCallback, useMemo, useContext, useEffect } from 'react';
import cx from 'classnames';
import styles from './Window.module.scss';
import AllLightsContext from '../contexts/AllLightsContext';
import NightModeContext from '../contexts/NightModeContext';

const ENTER_CODE = 13;
const SPACE_CODE = 32;

const Window: React.FC = () => {
  const isNight = useContext(NightModeContext);
  const isAllLightsOn = useContext(AllLightsContext);
  const [isLightOn, setIsLightOn] = useState(false);

  const handleWindowClick = useCallback(() => {
    setIsLightOn((lightState) => !lightState);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode === ENTER_CODE || e.keyCode === SPACE_CODE) {
        handleWindowClick();
      }
    },
    [handleWindowClick]
  );

  const windowClassName = useMemo(() => {
    const classnames = [styles.window];
    if (isLightOn) classnames.push(styles['light-on']);
    else classnames.push(styles['light-off']);
    if (isNight) classnames.push(styles['dark-mode']);
    return cx(classnames);
  }, [isLightOn, isNight]);

  useEffect(() => {
    setIsLightOn(isAllLightsOn);
  }, [isAllLightsOn]);

  return (
    <div
      data-testid="window"
      className={windowClassName}
      onClick={handleWindowClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.leftWindowProtect} />
      <div className={styles['leftWindowProtect--movable']} />
      <div className={styles.leftWindowProtect} />
      <div className={styles.rightWindowProtect} />
      <div className={styles['rightWindowProtect--movable']} />
      <div className={styles['protection-grid']} />
    </div>
  );
};

export default Window;
