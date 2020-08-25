import React, { useState, useCallback } from 'react';
import { hot } from 'react-hot-loader';
import styles from './App.module.scss';
import Building from './components/Building';
import AllLightsContext from './contexts/AllLightsContext';
import LightSwitchButton from './components/LightSwitchButton';

const App: React.FC = () => {
  const [isAllLightsOn, setIsAllLightsOn] = useState(false);

  const handleAllLights = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAllLightsOn(e.target.checked);
  }, []);

  return (
    <AllLightsContext.Provider value={isAllLightsOn}>
      <div className={styles.app}>
        <LightSwitchButton onChange={handleAllLights} checked={isAllLightsOn} />

        <Building numberOfWindows={12} />
      </div>
    </AllLightsContext.Provider>
  );
};

export default hot(module)(App);
