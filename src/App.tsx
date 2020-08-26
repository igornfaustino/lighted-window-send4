import React, { useState, useCallback, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import styles from './App.module.scss';
import Building from './components/Building';
import AllLightsContext from './contexts/AllLightsContext';
import LightSwitchButton from './components/LightSwitchButton';
import useIsNight from './hooks/useIsNight';
import NightModeContext from './contexts/NightModeContext';

const App: React.FC = () => {
  const { isNight, verifyIfIsNightOnCurrentRegion } = useIsNight();
  const [isAllLightsOn, setIsAllLightsOn] = useState(true);

  const handleAllLights = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAllLightsOn(e.target.checked);
  }, []);

  useEffect(() => {
    verifyIfIsNightOnCurrentRegion();
  }, [verifyIfIsNightOnCurrentRegion]);

  return (
    <NightModeContext.Provider value={isNight}>
      <AllLightsContext.Provider value={isAllLightsOn}>
        <div className={styles.app}>
          <LightSwitchButton onChange={handleAllLights} checked={isAllLightsOn} />

          <Building numberOfWindows={12} />
        </div>
      </AllLightsContext.Provider>
    </NightModeContext.Provider>
  );
};

export default hot(module)(App);
