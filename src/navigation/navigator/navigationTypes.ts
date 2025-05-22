export type UnauthenticatedStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  Verification: {email: string};
};

export type ProductsStackParamList = {
  Products: undefined;
  Details: {id: string};
};

export type AuthenticatedTabParamList = {
  Devices: undefined;
  'Create Product': undefined;
  Cart: undefined;
  Profile: undefined;
};

export type UploadStackParamList = {
  UploadHome: undefined;
  CameraScreen: undefined;
};
