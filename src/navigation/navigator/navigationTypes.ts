export type UnauthenticatedStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  Verification: {email: string};
  'Forgot Password': undefined;
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
export type AuthenticatedStackParamList = {
  Tabs: undefined;
  CameraScreen?: {onCapture?: (image: any) => void};
  'Edit Product': {id: string};
};
export type RootStackParamList = {
  // Authenticated routes
  Tabs: undefined;
  CameraScreen?: {onCapture?: (image: any) => void};
  'Edit Product': {id: string};

  // Add unauthenticated routes if needed
  Home?: undefined;
  Login?: undefined;
};
