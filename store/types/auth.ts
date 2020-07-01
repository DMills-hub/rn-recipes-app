export const LOGIN: string = "LOGIN";
export const LOADING: string = "LOADING";
export const ERROR: string = "ERROR";
export const LOGOUT: string = "LOGOUT";
export const AUTO_LOGIN: string = "AUTO_LOGIN";
export const CLEAR_ERR: string = "CLEAR_ERR";

interface Login {
  type: typeof LOGIN;
  username: string;
  password: string;
}

interface Loading {
  type: typeof LOADING;
  loading: boolean;
}

interface Error {
  type: typeof ERROR;
  message: string;
}

interface Logout {
  type: typeof LOGOUT;
}

interface AutoLogin {
  type: typeof AUTO_LOGIN;
  success: boolean;
  userData: {
    token: string | null | undefined;
    userId: string | number | null | undefined;
    username: string | null | undefined;
  };
}

interface ClearErr {
  type: typeof CLEAR_ERR;
}

export type AuthTypes = Login | Loading | Error | Logout | AutoLogin | ClearErr;
