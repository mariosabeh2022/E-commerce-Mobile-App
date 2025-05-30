import {render} from '@testing-library/react-native';
import CustomIcons from '../customModalIcons';
jest.mock('react-native-image-crop-picker', () => ({
  openPicker: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: jest.fn()}),
}));

jest.mock('../../../../contexts/themeContext', () => ({
  useTheme: () => ({theme: 'light'}),
}));

jest.mock('../../../../stores/profileStore/profileStore', () => ({
  __esModule: true,
  default: () => ({updateProfileImage: () => {}}),
}));

jest.mock('../../../../stores/uploadStore/uploadStore', () => ({
  useImageStore: () => ({setImage: () => {}}),
}));
describe('CustomIcons Component', () => {
  it('renders all sections including remove when includeRemove is true', () => {
    const {getByTestId} = render(<CustomIcons includeRemove={true} />);

    expect(getByTestId('main-container')).toBeTruthy();
    expect(getByTestId('camera-container')).toBeTruthy();
    expect(getByTestId('gallery-container')).toBeTruthy();
    expect(getByTestId('remove-picture-container')).toBeTruthy();

    expect(getByTestId('camera')).toBeTruthy();
    expect(getByTestId('gallery')).toBeTruthy();
    expect(getByTestId('remove-picture')).toBeTruthy();
  });

  it('does not render remove section when includeRemove is false', () => {
    const {queryByTestId} = render(<CustomIcons includeRemove={false} />);

    expect(queryByTestId('remove-picture-container')).toBeNull();
    expect(queryByTestId('remove-picture')).toBeNull();
  });
});
