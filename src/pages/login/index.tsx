import type { LoginParams } from '@/interface/user/login';
import type { FC } from 'react';

import './index.less';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { apiLogin } from '@/api/user.api';
import LogoPng from '@/assets/logo/logo_w.png';
import { LocaleFormatter, useLocale } from '@/locales';
import { setUserItem } from '@/stores/user.store';
import { formatSearch } from '@/utils/formatSearch';

const initialValues: LoginParams = {
  account: 'guest',
  pwd: 'guest',
  // remember: true
};

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formatMessage } = useLocale();
  const dispatch = useDispatch();

  const onFinished = (form: LoginParams) => {
    apiLogin(form).then(({ data }) => {
      if (!!data) {
        const search = formatSearch(location.search);
        const from = search.from || { pathname: '/' };

        localStorage.setItem('MyUserInfo', data.access_token);
        localStorage.setItem('username', form.account);
        dispatch(
          setUserItem({
            logged: true,
            username: form.account,
          }),
        );

        navigate(from);
      }
    });
  };

  return (
    <div className="login-page">
      <div className="logo">
        <img src={LogoPng} alt="" />
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinished}
        size="large"
      >
        <Form.Item
          name="account"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'gloabal.tips.enterUsernameMessage',
              }),
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="pwd"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'gloabal.tips.enterPasswordMessage',
              }),
            },
          ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>保存用户名</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
