import React, { useMemo, useContext } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { VscLightbulb } from 'react-icons/vsc';
import cx from 'classnames';
import styles from './LightSwitchButton.module.scss';
import NightModeContext from '../contexts/NightModeContext';

interface props {
  'data-testid'?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const LightSwitchButton: React.FC<props> = ({ onChange, checked }) => {
  const isNight = useContext(NightModeContext);

  const switchClassnames = useMemo(() => {
    const classnames = [styles.lightBox];
    if (isNight) classnames.push(styles['dark-mode']);
    return cx(classnames);
  }, [isNight]);

  return (
    <div className={switchClassnames} data-testid="switch-wrapper">
      <label className={styles.switch} htmlFor="light-checkbox">
        <input
          type="checkbox"
          id="light-checkbox"
          data-testid="switch-all-lights"
          onChange={onChange}
          checked={checked}
        />
        <span className={styles.slider} />
        <VscLightbulb className={styles.iconLeft} />
        <HiOutlineLightBulb className={styles.iconRight} />
      </label>
    </div>
  );
};

export default LightSwitchButton;
