import { renderHook } from '@testing-library/react-hooks';
import useIsNight, { URL } from './useIsNight';

const geolocationFunction = jest.fn();
const fetchMock = jest.fn();

const getTimeFromNow = (amountOfTime: number): Date => {
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + amountOfTime);
  return currentTime;
};

Object.defineProperty(global.navigator, 'geolocation', {
  value: {
    getCurrentPosition: geolocationFunction,
  },
});

Object.defineProperty(global, 'fetch', {
  value: fetchMock,
});

describe('useIsNight hooks', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  beforeAll(() => {
    geolocationFunction.mockImplementation((success) => {
      success({
        coords: {
          latitude: -20,
          longitude: -50,
        },
      });
    });

    fetchMock.mockResolvedValue({
      json: () =>
        Promise.resolve({
          status: 'OK',
          results: {
            sunrise: getTimeFromNow(-12).toUTCString(),
            sunset: getTimeFromNow(-2).toUTCString(),
          },
        }),
    });
  });

  test('should return an error when geolocation returns an error', async () => {
    geolocationFunction.mockImplementationOnce((_success, error) => {
      error('Fail to get current position');
    });
    const { result, waitForNextUpdate } = renderHook(() => useIsNight());
    result.current.verifyIfIsNightOnCurrentRegion();
    await waitForNextUpdate();
    expect(geolocationFunction).toHaveBeenCalled();
    expect(result.current.error).toBe('Fail to get current position');
  });

  test('should return an error when empty coords is passed', async () => {
    geolocationFunction.mockImplementationOnce((success) => {
      success({
        coords: {},
      });
    });
    const { result, waitForNextUpdate } = renderHook(() => useIsNight());
    result.current.verifyIfIsNightOnCurrentRegion();
    await waitForNextUpdate();
    expect(geolocationFunction).toHaveBeenCalled();
    expect(result.current.error).toBe('Invalid position');
  });

  test('should request the api', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useIsNight());
    result.current.verifyIfIsNightOnCurrentRegion();
    await waitForNextUpdate();
    expect(fetchMock).toHaveBeenCalledWith(`${URL}?formatted=0&lat=-20&lng=-50`);
  });

  test('should throw error when status is not OK', async () => {
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({ status: 'INVALID_REQUEST' }),
    });
    const { result, waitForNextUpdate } = renderHook(() => useIsNight());
    result.current.verifyIfIsNightOnCurrentRegion();
    await waitForNextUpdate();
    expect(result.current.error).toBe('INVALID_REQUEST');
  });

  test('should throw error when request failed', async () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    fetchMock.mockImplementationOnce(() => Promise.reject('API is down'));
    const { result, waitForNextUpdate } = renderHook(() => useIsNight());
    result.current.verifyIfIsNightOnCurrentRegion();
    await waitForNextUpdate();
    expect(result.current.error).toBe('API is down');
  });

  test('is night should be True', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useIsNight());
    result.current.verifyIfIsNightOnCurrentRegion();
    await waitForNextUpdate();
    expect(result.current.error).toBe('');
    expect(result.current.isNight).toBeTruthy();
  });

  test('is night should be False', async () => {
    fetchMock.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          status: 'OK',
          results: {
            sunrise: getTimeFromNow(-3).toUTCString(),
            sunset: getTimeFromNow(8).toUTCString(),
          },
        }),
    });
    const { result, waitForNextUpdate } = renderHook(() => useIsNight());
    result.current.verifyIfIsNightOnCurrentRegion();
    try {
      await waitForNextUpdate({ timeout: 2000 });
    } catch (error) {
      expect(error.message).toBe('Timed out in waitForNextUpdate after 2000ms.');
      expect(result.current.error).toBe('');
      expect(result.current.isNight).toBeFalsy();
    }
  });
});
