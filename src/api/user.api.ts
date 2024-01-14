import type { LoginParams, LoginResult, LogoutParams, LogoutResult } from '../interface/user/login';

import { request } from './request';

/** 登录接口 */
export const apiLogin = (data: LoginParams) => request<LoginResult>('post', '/user/access_token', data);

/** 登出接口 */
export const apiLogout = (data: LogoutParams) => request<LogoutResult>('delete', '/user/access_token', data);
