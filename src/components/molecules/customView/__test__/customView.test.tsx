import React from 'react';
import {render} from '@testing-library/react-native';
import CustomView from '../customView';
import {Text} from 'react-native';

describe('CustomPressable Component', () => {
  it('renders correctly with children', () => {
    const {getByText} = render(
      <CustomView>
        <Text testID="text">Hello</Text>
      </CustomView>,
    );
    expect(getByText('Hello')).toBeOnTheScreen();
    expect(getByText('Hello')).toBeTruthy();
  });
});
