import { jwtDecode, JwtPayload } from "jwt-decode";
import { getFromLocalStorage, StorageKeys } from "./storage-services";

export const isUserLoggedIn = () => {
  const token = getFromLocalStorage(StorageKeys.ACCESS_TOKEN);
  return token && !isTokenExpired(jwtDecode(token));
};

const isTokenExpired = (token: JwtPayload) => {
  if (token && token.exp) return Date.now() >= token.exp * 1000;
};
