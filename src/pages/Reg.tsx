import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom'
import { registApi } from '../apis/user';

import '../assets/styles/logReg/log.less'



export default function Login() {
  const onFinish = async (values: number | string) => {
    console.log('Received values of form: ', values);
    const data = await registApi(values)
    console.log('registApi', data);

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
        <h1 className='title'>注册账户</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" />
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
            注册账户
          </Button>
          <NavLink to="/login">已有账号，去登录！</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
}
