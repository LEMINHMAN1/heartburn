import React from 'react';
import { render } from '@testing-library/react';
import Button from './index'

describe('Button', () => {
  test('should render successfully', () => {
    const onClick = jest.fn();
    const { baseElement } = render(
      <Button onClick={onClick}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});