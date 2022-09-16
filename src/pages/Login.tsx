import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, message, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import * as user from '../store/modules/user'
import { useSelector, useDispatch } from 'react-redux'

import { loginApi } from '../apis/user';

import '../assets/styles/logReg/log.less'
// import { getRouters } from '../configs/routers';


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 登录跳转
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const { data } = await loginApi(values)
    console.log(data);
    if (data) {
      // localStorage.setItem('config', JSON.stringify(data.config))
      // localStorage.setItem('exipreTime', JSON.stringify(data.exipreTime))
      // localStorage.setItem('permissions', JSON.stringify(data.permissions))
      // localStorage.setItem('token', JSON.stringify(data.token))
      // localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.config = JSON.stringify(data.config)
      localStorage.exipreTime = JSON.stringify(data.exipreTime)
      localStorage.permissions = JSON.stringify(data.permissions)
      localStorage.token = data.token
      localStorage.user = JSON.stringify(data.user)
      dispatch(user.setUserMsg(data))
      message.success('登录成功！');
      // getRouters()
      navigate('/navPage');
    } else {
      message.error('认证失败！');
    }

  };

  return (
    <div className='Main vh100'>
      <Form
        style={{ width: 260 }}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h1 className='title'>赤兔养车</h1>
        <div>账号：mrbird密码：1234qwer</div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            认 证 登 录
          </Button>
          <NavLink to="/reg">注册账户</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
}
