import { Button, Form, Input, Select, DatePicker, Card } from 'antd';
import React from 'react';


const { RangePicker } = DatePicker;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const config = {
  rules: [{ type: 'object' as const, }],
};
const rangeConfig = {
  rules: [{ type: 'array' as const, }],
};


const Header = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="username"
        label="用户名"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="deptId"
        label="部门"
      >
        <Select
          placeholder="选择部门"
          // onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item name="createTimeFromTwo" label="创建时间" {...rangeConfig}>
        <RangePicker showTime format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" style={{ marginRight: 15 }} htmlType="submit">
          提交
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>

      </Form.Item>
    </Form>
  );
};

export default Header;