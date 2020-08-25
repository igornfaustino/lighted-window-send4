import React, { useState, useCallback, useMemo } from 'react';
import cx from 'classnames';
import styles from './Window.module.scss';

const Window: React.FC = () => {
  const [isLightOn, setIsLightOn] = useState(false);

  const handleWindowClick = useCallback(() => {
    setIsLightOn((lightState) => !lightState);
  }, []);

  const windowClassName = useMemo(
    () =>
      isLightOn ? cx(styles.window, styles['light-on']) : cx(styles.window, styles['light-off']),
    [isLightOn]
  );

  return (
    <div
      data-testid="window"
      className={windowClassName}
      onClick={handleWindowClick}
      role="button"
      tabIndex={0}
    >
      Window
    </div>
  );
};

export default Window;
