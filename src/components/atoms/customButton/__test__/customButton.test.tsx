import {render} from '@testing-library/react-native';
import CustomButton from '../customButton';

test('Render Custom Button', () => {
  const {getByTestId} = render(<CustomButton text="Login" />);
  const background = getByTestId('button-background');
  expect(background.props.colors).toHaveLength(3);
  expect(background.props.colors).toEqual([
    expect.any(Number),
    expect.any(Number),
    expect.any(Number),
  ]);
  const styles = background.props.style;
  expect(styles.alignItems).toBe('center');
  expect(styles.justifyContent).toBe('center');
  expect(styles.borderRadius).toBe(40);
  expect(getByTestId('button-background')).toBeOnTheScreen();

  const text = getByTestId('custom-text');
  const style = text.props.style;
  expect(style.color).toBe('#fff');
  expect(style.fontFamily).toBe('Sansation-BoldItalic');
  expect(style.fontSize).toBe(16);

  expect(getByTestId('custom-text')).toBeOnTheScreen();
  expect(getByTestId('custom-text').props.children).toBe('Login');
});
