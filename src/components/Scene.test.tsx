import React from 'react';
import { render } from '@testing-library/react';
import Scene from './Scene';
import NightModeContext from '../contexts/NightModeContext';
import styles from './Scene.module.scss';

describe('Building component', () => {
  test('should render', () => {
    const { asFragment } = render(<Scene />);
    expect(asFragment()).toBeTruthy();
  });

  test('should render child components', () => {
    const child = <div>Child component</div>;
    const { getByText } = render(<Scene>{child}</Scene>);
    expect(getByText('Child component')).toBeDefined();
  });

  describe('night mode', () => {
    test('scene is on dark mode', () => {
      const { getByTestId } = render(
        <NightModeContext.Provider value>
          <Scene />
        </NightModeContext.Provider>
      );
      const scene = getByTestId('scene');
      expect(scene.classList.contains(styles['dark-mode'])).toBeTruthy();
    });

    test('scene is not on dark mode', () => {
      const { getByTestId } = render(
        <NightModeContext.Provider value={false}>
          <Scene />
        </NightModeContext.Provider>
      );
      const scene = getByTestId('scene');
      expect(scene.classList.contains(styles['dark-mode'])).toBeFalsy();
    });
  });
});
