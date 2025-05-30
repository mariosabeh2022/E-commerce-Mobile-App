import {render} from '@testing-library/react-native';
import CustomLink from '../customLink';

test('Custom Link Test', () => {
  const {getByTestId} = render(<CustomLink text="This is a link" />);
  const link = getByTestId('custom-link');
  expect(link).toBeOnTheScreen();
  expect(link.props.children).toBe('This is a link');
});
