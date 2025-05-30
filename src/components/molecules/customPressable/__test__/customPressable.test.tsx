import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomPressable from '../customPressable';
import {Text} from 'react-native';

describe('CustomPressable Component', () => {
  it('renders correctly with children', () => {
    const {getByText} = render(
      <CustomPressable onPress={() => {}}>
        <Text>Click Me</Text>
      </CustomPressable>,
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const {getByTestId} = render(
      <CustomPressable onPress={mockPress}>
        <Text>Press</Text>
      </CustomPressable>,
    );

    fireEvent.press(getByTestId('pressable'));
    expect(mockPress).toHaveBeenCalled();
  });
});
