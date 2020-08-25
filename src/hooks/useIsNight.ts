import { useState, useCallback } from 'react';

const BASE_URL = 'https://api.sunrise-sunset.org/json';

interface Position {
  coords: Coordinates;
}

interface SunsetData {
  sunrise: string;
  sunset: string;
}

type UseIsNightType = () => {
  isNight: boolean;
  error: string;
  verifyIfIsNightOnCurrentRegion: () => Promise<void>;
};

const useIsNight: UseIsNightType = () => {
  const [isNight, setIsNight] = useState(false);
  const [error, setError] = useState('');

  const getCurrentPosition = useCallback(
    () =>
      new Promise<Position>((resolve, reject) => {
        if (!navigator.geolocation) throw Error('Geolocation not available');
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }),
    []
  );

  const requestSunriseSunsetAPI = useCallback(({ coords }: Position) => {
    if (!coords || !coords.latitude || !coords.longitude) throw Error('Invalid position');
    return fetch(`${BASE_URL}?formatted=0&lat=${coords.latitude}&lng=${coords.longitude}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 'OK') throw Error(data.status);
        return data.results;
      });
  }, []);

  const verifyAndSetIfIsNight = useCallback((data: SunsetData) => {
    const sunset = new Date(data.sunset);
    const sunrise = new Date(data.sunrise);
    const currentTime = new Date();
    if (currentTime >= sunrise && currentTime < sunset) return setIsNight(false);
    return setIsNight(true);
  }, []);

  const verifyIfIsNightOnCurrentRegion = useCallback(async () => {
    try {
      const position = await getCurrentPosition();
      const sunsetData = <SunsetData>await requestSunriseSunsetAPI(position);
      verifyAndSetIfIsNight(sunsetData);
    } catch (ex) {
      setError(ex.message);
    }
  }, [getCurrentPosition, requestSunriseSunsetAPI, verifyAndSetIfIsNight]);

  return { isNight, error, verifyIfIsNightOnCurrentRegion };
};

export default useIsNight;
