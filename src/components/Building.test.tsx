import React from 'react';
import { render } from '@testing-library/react';
import Building from './Building';

describe('Building component', () => {
  test('should render', () => {
    const { asFragment } = render(<Building />);
    expect(asFragment()).toBeTruthy();
  });

  test('building should have 0 window', () => {
    const { queryAllByTestId } = render(<Building numberOfWindows={0} />);
    expect(queryAllByTestId('window')).toHaveLength(0);
  });

  test('building should have 100 windows', () => {
    const { queryAllByTestId } = render(<Building numberOfWindows={100} />);
    expect(queryAllByTestId('window')).toHaveLength(100);
  });

  test('building should have 1 window', () => {
    const { queryAllByTestId } = render(<Building numberOfWindows={1} />);
    expect(queryAllByTestId('window')).toHaveLength(1);
  });

  test('building should have 0 window when pass a negative number', () => {
    const { queryAllByTestId } = render(<Building numberOfWindows={-1} />);
    expect(queryAllByTestId('window')).toHaveLength(0);
  });
});
