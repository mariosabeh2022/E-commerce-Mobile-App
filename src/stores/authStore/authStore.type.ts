export interface AuthStoreProps {
  accessToken: null | string;
  refreshToken: null | string;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearToken: () => void;
  isStoreHydrated?:boolean,
  setIsHydrated:()=>void,
}
