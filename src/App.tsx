import React, { useState, useCallback, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import Building from './components/Building';
import AllLightsContext from './contexts/AllLightsContext';
import LightSwitchButton from './components/LightSwitchButton';
import useIsNight from './hooks/useIsNight';
import NightModeContext from './contexts/NightModeContext';
import Scene from './components/Scene';

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
        <Scene>
          <LightSwitchButton onChange={handleAllLights} checked={isAllLightsOn} />
          <Building numberOfWindows={12} />
        </Scene>
      </AllLightsContext.Provider>
    </NightModeContext.Provider>
  );
};

export default hot(module)(App);
