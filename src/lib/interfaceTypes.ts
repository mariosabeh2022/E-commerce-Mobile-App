export interface LoginCredentials {
  email: string;
  password: string;
  token_expires_in?: string;
}

export interface RefreshCredentials {
  refreshToken: string;
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

export interface fetchProfileCredentials {
  token: string;
}

export interface updateProfileCredentials {
  token: string;
  firstName: string;
  lastName: string;
  image?: string;
}

export interface fetchProductsCredentials {
  token: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}
