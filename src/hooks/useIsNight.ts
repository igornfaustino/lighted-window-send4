import { useState, useCallback } from 'react';

// used to enable CORS for "production" on localhost
const PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_URL = 'https://api.sunrise-sunset.org/json';
export const URL = `${PROXY}${API_URL}`;

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
        if (!navigator.geolocation) throw new Error('Geolocation not available');
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }),
    []
  );

  const requestSunriseSunsetAPI = useCallback(({ coords }: Position) => {
    if (!coords || !coords.latitude || !coords.longitude) throw new Error('Invalid position');
    const url = `${URL}?formatted=0&lat=${coords.latitude}&lng=${coords.longitude}`;
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 'OK') throw new Error(data.status);
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
      return verifyAndSetIfIsNight(sunsetData);
    } catch (ex) {
      if (ex.message) return setError(ex.message);
      return setError(ex);
    }
  }, [getCurrentPosition, requestSunriseSunsetAPI, verifyAndSetIfIsNight]);

  return { isNight, error, verifyIfIsNightOnCurrentRegion };
};

export default useIsNight;
