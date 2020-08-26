import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import styles from './components/Window.module.scss';

import App from './App';

const testWindowsClassName = (windows: HTMLElement[], className: string) =>
  windows.forEach((window) => {
    expect(window.classList.contains(className)).toBeTruthy();
  });

describe('App component', () => {
  test('App render', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toBeTruthy();
  });

  test('should have 12 windows', () => {
    const { queryAllByTestId } = render(<App />);
    expect(queryAllByTestId('window')).toHaveLength(12);
  });

  test('checkbox should turn all lights on and off', () => {
    const { getByTestId, getAllByTestId } = render(<App />);
    const switchButton = getByTestId('switch-all-lights');
    const windows = getAllByTestId('window');
    testWindowsClassName(windows, styles['light-on']);
    fireEvent.click(switchButton);
    testWindowsClassName(windows, styles['light-off']);
    fireEvent.click(switchButton);
    testWindowsClassName(windows, styles['light-on']);
  });
});
