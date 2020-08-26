import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Window from './Window';
import styles from './Window.module.scss';
import AllLightsContext from '../contexts/AllLightsContext';
import NightModeContext from '../contexts/NightModeContext';

describe('Window component', () => {
  test('should render', () => {
    const { asFragment } = render(<Window />);
    expect(asFragment()).toBeTruthy();
  });

  test('window should be with lights off by default', () => {
    const { getByTestId } = render(<Window />);
    const window = getByTestId('window');
    expect(window.classList.contains(styles['light-off'])).toBeTruthy();
  });

  test('turn lights on when click on window', () => {
    const { getByTestId } = render(<Window />);
    const window = getByTestId('window');
    fireEvent.click(window);
    expect(window.classList.contains(styles['light-on'])).toBeTruthy();
  });

  test('turn lights on and off when click on window', () => {
    const { getByTestId } = render(<Window />);
    const window = getByTestId('window');
    fireEvent.click(window);
    expect(window.classList.contains(styles['light-on'])).toBeTruthy();
    fireEvent.click(window);
    expect(window.classList.contains(styles['light-off'])).toBeTruthy();
  });

  describe('light context', () => {
    test('context starts with lights on', () => {
      const { getByTestId } = render(
        <AllLightsContext.Provider value>
          <Window />
        </AllLightsContext.Provider>
      );
      const window = getByTestId('window');
      expect(window.classList.contains(styles['light-on'])).toBeTruthy();
    });
  });

  describe('night mode', () => {
    test('window is on dark mode', () => {
      const { getByTestId } = render(
        <NightModeContext.Provider value>
          <Window />
        </NightModeContext.Provider>
      );
      const window = getByTestId('window');
      expect(window.classList.contains(styles['dark-mode'])).toBeTruthy();
    });

    test('window is not on dark mode', () => {
      const { getByTestId } = render(
        <NightModeContext.Provider value={false}>
          <Window />
        </NightModeContext.Provider>
      );
      const window = getByTestId('window');
      expect(window.classList.contains(styles['dark-mode'])).toBeFalsy();
    });
  });
});
