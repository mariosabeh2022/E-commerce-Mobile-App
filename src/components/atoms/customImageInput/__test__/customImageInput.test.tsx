import {fireEvent, render, waitFor} from '@testing-library/react-native';
import CustomImageInput from '../customImageInput';
import ImagePicker from 'react-native-image-crop-picker';
import * as permissionUtils from '../../../../utils/requestGalleryPermission';

jest.mock('react-native-image-crop-picker', () => ({
  openPicker: jest.fn(),
}));

jest.mock('../../../../utils/requestGalleryPermission', () => ({
  requestGalleryPermission: jest.fn(),
}));

test('CustomImageInput triggers image picking and calls onImagesChange', async () => {
  const mockOnImagesChange = jest.fn();

  const mockRequestGalleryPermission =
    permissionUtils.requestGalleryPermission as jest.Mock;
  const mockOpenPicker = ImagePicker.openPicker as jest.Mock;

  mockRequestGalleryPermission.mockResolvedValue(true);
  mockOpenPicker.mockResolvedValue({
    path: 'mocked/image/path.jpg',
  });

  const {getByTestId} = render(
    <CustomImageInput images={[]} onImagesChange={mockOnImagesChange} />,
  );

  const touchableIcon = getByTestId('touchable-icon');
  fireEvent.press(touchableIcon);

  await waitFor(() => {
    expect(mockOnImagesChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          uri: 'mocked/image/path.jpg',
        }),
      ]),
    );
  });
});
