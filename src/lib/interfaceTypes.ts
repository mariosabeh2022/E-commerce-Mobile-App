export interface LoginCredentials {
  email: string;
  password: string;
  token_expires_in?: string;
}

export interface resetPasswordCredentials {
  email: string;
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
  profileImage?: {
    uri: string;
    name?: string;
    type?: string;
  };
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

export interface fetchProductsCredentials {
  token: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface searchProductsCredentials {
  token: string;
  query: string;
}

export interface productDetailCredentials {
  token: string;
  id: string;
}

export interface createProductCredentials {
  token: string;
  title: string;
  description: string;
  price: number;
  location: {
    name: string;
    longitude: number;
    latitude: number;
  };
  images: {uri: string; _id: string}[];
}

export interface editProductCredentials {
  token: string;
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    name: string;
    longitude: number;
    latitude: number;
  };
  images: {uri: string; _id: string}[];
}

export interface deleteProductCredentials {
  token: string;
  id: string;
}
