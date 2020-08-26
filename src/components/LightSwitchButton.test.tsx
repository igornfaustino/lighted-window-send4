import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LightSwitchButton from './LightSwitchButton';
import NightModeContext from '../contexts/NightModeContext';
import styles from './LightSwitchButton.module.scss';

describe('Light Switch Button component', () => {
  test('should render', () => {
    const { asFragment } = render(<LightSwitchButton onChange={() => null} checked={false} />);
    expect(asFragment()).toBeTruthy();
  });

  test('call on change function when click on input', () => {
    const mockHandleLights = jest.fn();
    const { getByTestId } = render(
      <LightSwitchButton onChange={mockHandleLights} checked={false} />
    );
    const checkboxInput = getByTestId('switch-all-lights');
    fireEvent.click(checkboxInput);
    expect(mockHandleLights).toHaveBeenCalledTimes(1);
  });

  test('should been checked', () => {
    const { getByTestId } = render(<LightSwitchButton onChange={() => null} checked />);
    const checkboxInput = getByTestId('switch-all-lights');
    expect(checkboxInput.getAttribute('checked')).toBe('');
  });

  test('should not been checked', () => {
    const { getByTestId } = render(<LightSwitchButton onChange={() => null} checked={false} />);
    const checkboxInput = getByTestId('switch-all-lights');
    expect(checkboxInput.getAttribute('checked')).toBeFalsy();
  });

  describe('night mode', () => {
    test('is on dark mode', () => {
      const { getByTestId } = render(
        <NightModeContext.Provider value>
          <LightSwitchButton onChange={() => null} checked={false} />
        </NightModeContext.Provider>
      );
      const wrapper = getByTestId('switch-wrapper');
      expect(wrapper.classList.contains(styles['dark-mode'])).toBeTruthy();
    });

    test('is not on dark mode', () => {
      const { getByTestId } = render(
        <NightModeContext.Provider value={false}>
          <LightSwitchButton onChange={() => null} checked={false} />
        </NightModeContext.Provider>
      );
      const wrapper = getByTestId('switch-wrapper');
      expect(wrapper.classList.contains(styles['dark-mode'])).toBeFalsy();
    });
  });
});
