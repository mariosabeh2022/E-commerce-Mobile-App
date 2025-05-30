import {render} from '@testing-library/react-native';
import CustomErrorMessage from '../errorMessage';

test('Render Custom Error Message', () => {
  const {getByTestId} = render(
    <CustomErrorMessage message="This is an error" />,
  );

  const text = getByTestId('error-message');
  const style = text.props.style;

  expect(style.color).toBe('red');
  expect(style.fontFamily).toBe('Sansation-BoldItalic');
  expect(text).toBeOnTheScreen();
  expect(text.props.children).toBe('This is an error');
});
