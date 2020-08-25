import React from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { VscLightbulb } from 'react-icons/vsc';
import styles from './LightSwitchButton.module.scss';

interface props {
  'data-testid'?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const LightSwitchButton: React.FC<props> = ({ onChange, checked }) => {
  return (
    <div className={styles.lightBox}>
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
