import { Button, Drawer, Space, Select, Radio, TreeSelect, Form, Input } from 'antd';
import React, { useState, useForm, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getDeptApi } from '../../../apis/dept';
import { changeUserApi } from '../../../apis/usersMsg';
import { getRoleApi } from '../../../apis/role';

// import * as userStoreFn from '../../../store/modules/user'


export default function DrawerBtn() {
  // store 状态机
  // const userState = useSelector(state => state.user.userList)
  // const dispatch = useDispatch();
  // dispatch(userStoreFn.getUserMsgByIdAsync('123'))

  const [dept, setDept] = useState({})
  const [role, setRole] = useState({})
  const [flg, setFlg] = useState(false)

  const [form] = Form.useForm();

  // 获取表单默认值
  const userMsgs = JSON.parse(localStorage.user)
  let { username, deptId, mobile, email, roleId, status, ssex, userId } = userMsgs
  // roleId = roleId.split(',')
  // 获取部门
  async function getDept() {
    const data = await getDeptApi()
    setDept(data)
  }
  // 获取角色
  async function getRole() {
    const data = await getRoleApi()
    setRole(data)
    setFlg(true)
  }

  // 进入
  useEffect(() => {
    getDept()
    getRole()
  }, [])
  // 抽屉
  const [open, setOpen] = useState(false);

  // 表单
  // const form = Form.useFormInstance(); // x
  const onFinish = async (values) => {
    console.log('Success:', values);
    localStorage.user = JSON.stringify({ ...userMsgs, ...values })
    const data = await changeUserApi(values)
    location.reload()
    console.log('onFinish-data', data);

    // form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // 抽屉
  const showLargeDrawer = () => {
    setOpen(true);
  };

  // 新增
  const onClose = () => {
    setOpen(false);
  };
  // 新增
  const onCloseAdd = () => {
    form.submit();
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button
          style={{ marginRight: 15 }}
          type="primary"
          onClick={showLargeDrawer}
        >
          编辑资料
        </Button>
      </Space>
      <Drawer
        title={'编辑资料'}
        placement="right"
        size='large'
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={onCloseAdd}>
              确认编辑
            </Button>
          </Space>
        }
      >
        <Form
          style={{
            width: "100%"
          }}
          form={form}
          name="basic2"
          labelCol={{ span: 5, }}
          wrapperCol={{ span: 15, }}
          // 默认值
          initialValues={{
            remember: true, size: 'large',
            username, email, userId,
            mobile,
            roleId, status, ssex, deptId
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ type: 'email', message: '请输入正确的邮箱！', },]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="用户Id"
            name="userId"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="mobile"
            rules={[{
              required: true,
              type: /[0-9]/,
              message: '请输入正确的手机号！',
            },]}
          >
            <Input
              // addonBefore={prefixSelector}
              style={{ width: '100%', }}
            />
          </Form.Item>

          <Form.Item
            label="角色"
            name="roleId"
            rules={[
              {
                required: true,
                message: '选择角色',
              },
            ]}
          >
            <Select mode="multiple" placeholder="选择角色">
              {flg && role.rows.map(a => {
                return <Select.Option
                  mode="multiple"
                  value={String(a.roleId)}
                  key={a.roleId}
                >
                  {a.roleName}
                </Select.Option>
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="部门"
            name="deptId"
            rules={[{
              required: true,
              message: '请选择部门！',
            },]}>
            <TreeSelect
              placeholder="请选择部门！"
              treeData={dept.rows?.children}
            />
          </Form.Item>

          <Form.Item name="status" label="状态"
            rules={[{
              required: true,
              message: '请选择状态！',
            }]}>
            <Radio.Group>
              <Radio value="1">有效</Radio>
              <Radio value="0">锁定</Radio>
            </Radio.Group>
          </Form.Item>


          <Form.Item name="ssex" label="性别"
            rules={[{
              required: true,
              message: '请选择性别！',
            }]}>
            <Radio.Group>
              <Radio value="0">男</Radio>
              <Radio value="1">女</Radio>
              <Radio value="2">保密</Radio>
            </Radio.Group>
          </Form.Item>
          {/* <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Drawer>
    </>
  )
}
