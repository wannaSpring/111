import type { LoginParams } from '../interface/user/login';
import type { Dispatch } from '@reduxjs/toolkit';

import { apiLogin, apiLogout } from '../api/user.api';
import { setUserItem } from './user.store';
import { createAsyncAction } from './utils';
// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const loginAsync = createAsyncAction<LoginParams, boolean>(payload => {
  return async dispatch => {
    const { data } = await apiLogin(payload);

    if (data) {
      localStorage.setItem('MyUserInfo', data.access_token);
      localStorage.setItem('username', payload.account);
      dispatch(
        setUserItem({
          logged: true,
          username: payload.account,
        }),
      );

      return true;
    }

    return false;
  };
});

export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    return await apiLogout({ token: localStorage.getItem('MyUserInfo')! })
      .then(() => {
        console.log('??');
        localStorage.clear();
        dispatch(
          setUserItem({
            logged: false,
          }),
        );

        return true;
      })
      .catch(() => {
        return false;
      });
  };
};
