import {render} from '@testing-library/react-native';
import CustomTitle from '../customTitle';

test('Render Custom Title', () => {
  const {getByTestId} = render(<CustomTitle text="This is a Title" />);

  const title = getByTestId('custom-title');
  const style = title.props.style;

  expect(style.fontFamily).toBe('Sansation-BoldItalic');
  expect(style.paddingTop).toBe('10%');
  expect(style.fontSize).toBe(30);
  expect(style.alignSelf).toBe('center');
  expect(title).toBeOnTheScreen();
  expect(title.props.children).toBe('This is a Title');
});
