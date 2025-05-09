export type UnauthenticatedStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  Verification: undefined;
};

export type AuthenticatedStackParamList = {
  Products: undefined;
  Details: {id: string};
};
