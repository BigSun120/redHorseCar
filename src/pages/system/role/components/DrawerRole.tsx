import { Button, Table, Drawer, Space, Form, Input } from 'antd';
import React, { useState } from 'react';

const DrawerRole = (props: any) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();// 设置 -- 表单
  const { TextArea } = Input; // 文本框
  console.log('props', props);

  // 提交表单
  const upData = () => {
    form.submit();
    console.log('添加角色');
  }
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // 抽屉 
  const showLargeDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        {props.type === 'add' &&
          <Button
            type="primary"
            style={{ marginRight: 20 }}
            onClick={showLargeDrawer}>
            添加角色
          </Button>
        }
      </Space>
      <Drawer
        title={'添加角色'}
        placement="right"
        size='large'
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={upData}>
              确认添加
            </Button>
          </Space>
        }
      >
        <Form
          name="wrap"
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
        >
          <Form.Item label="角色名称" name="roleId"  >
            <Input />
          </Form.Item>

          <Form.Item label="角色描述" name="description" >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default DrawerRole;