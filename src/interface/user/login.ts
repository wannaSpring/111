/** user's role */
export type Role = 'guest' | 'admin';

export interface LoginParams {
  /** 用户名 */
  account: string;
  /** 用户密码 */
  pwd: string;
}

export interface LoginResult {
  access_token: string;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
