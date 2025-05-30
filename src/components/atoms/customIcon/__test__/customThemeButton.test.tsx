import {render} from '@testing-library/react-native';
import CustomIcon from '../../customIcon/customIcon';

test('Render Custom Sun Icon', () => {
  const {getByTestId} = render(<CustomIcon type="sun" />);
  const sunIcon = getByTestId('custom-sun-icon');
  expect(sunIcon).toBeTruthy();
  expect(sunIcon.props.children).toBeTruthy();
});

test('Render Custom Icon', () => {
  const {getByTestId} = render(<CustomIcon type="" />);
  const customIcon = getByTestId('custom-icon');
  expect(customIcon).toBeOnTheScreen();
  expect(customIcon.props.children).toBeTruthy();
});
