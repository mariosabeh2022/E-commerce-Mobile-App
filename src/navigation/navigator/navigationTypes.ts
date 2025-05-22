export type UnauthenticatedStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  Verification: {email: string};
};

export type ProductsStackParamList = {
  Products: {fromScreen: string};
  Details: {id: string};
  'Edit Product': {id: string};
};

export type AuthenticatedTabParamList = {
  Devices: {fromScreen: string};
  'Create Product': undefined;
  Cart: undefined;
  Profile: undefined;
};

export type UploadStackParamList = {
  UploadHome: undefined;
  CameraScreen: undefined;
};
