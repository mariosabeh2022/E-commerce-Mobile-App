export interface LoginCredentials {
  email: string;
  password: string;
  token_expires_in?: string;
}

export interface SignUpCredentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface VerifyCredentials {
  email: string;
  otp: string;
}

export interface reVerificationCredentials {
  email: string;
}
