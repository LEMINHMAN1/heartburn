import React from 'react';
import { render } from '@testing-library/react';
import Header from './index'

describe('Header', () => {
  test('should render successfully', () => {
    const onBack = jest.fn();
    const { baseElement } = render(
      <Header onBack={onBack}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});