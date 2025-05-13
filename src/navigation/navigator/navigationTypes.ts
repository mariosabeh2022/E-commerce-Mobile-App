export type UnauthenticatedStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  Verification: undefined;
};

export type ProductsStackParamList = {
  Products: undefined;
  Details: { id: string };
};

export type AuthenticatedTabParamList = {
  Devices: undefined;
  Upload: undefined;
  Cart: undefined;
  Profile: undefined;
};
