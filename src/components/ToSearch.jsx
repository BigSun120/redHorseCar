import { Button, Form, Popconfirm, Modal, Col, Row, Input, Select, DatePicker, Table, TreeSelect, Space, message, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react';
import moment from 'moment';

import { getDeptApi } from '../apis/dept';

/**
 *  接收参数说明：
 *  1. showInp （对象） ：要显示的 输入框
 *  2. getChildSearch （函数） ： 子传父 （输入框的值）
 *  3. onReset （函数） ： 重置 form (父 重新渲染即可)
 * **/

export default function ToSearch(props) {
  const [dept, setDept] = useState({}) // 部门
  const [form] = Form.useForm();// 表单
  const { RangePicker } = DatePicker;// 日期
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };// 样式

  // 重置
  const onReset = () => {
    form.resetFields();
    // props.onReset()
    { props.onReset && props.onReset() }
  };

  useEffect(() => {
    getDept()
  }, [])

  // 获取部门
  async function getDept() {
    const data = await getDeptApi()
    console.log('getDept()', data);
    setDept(data)
  }

  // 筛选按钮--提交
  const onFinish = (values) => {
    if (values.createTimeFromTwo?.length === 2) {
      values.createTimeFrom = moment(values.createTimeFromTwo[0]).format('YYYY-MM-DD')
      values.createTimeTo = moment(values.createTimeFromTwo[1]).format('YYYY-MM-DD')
      delete values.createTimeFromTwo
    }
    console.log(values);
    props.getChildSearch(values)
  };
  // console.log('asdasda', props.showInp);
  return (
    <div style={{ margin: '20px 10px' }}>
      <Form style={{ display: 'flex', flexWrap: 'wrap' }}
        name="control-hooks" onFinish={onFinish} form={form}>

        {props.showInp?.username && <Form.Item name="username" label="用户名">
          <Input style={{ width: 200 }} placeholder="请输入用户名" />
        </Form.Item>}

        {props.showInp?.role && <Form.Item name="roleName" label="角色">
          <Input style={{ width: 200 }} placeholder="请输入角色" />
        </Form.Item>}

        {props.showInp?.deptId && <Form.Item label="部门" name="deptId">
          <TreeSelect placeholder="请选择部门！" treeData={dept.rows?.children} />
        </Form.Item>}

        {props.showInp?.date && <Form.Item name="createTimeFromTwo" label="创建时间"  >
          <RangePicker style={{ width: 200 }} showTime format="YYYY-MM-DD" />
        </Form.Item>}

        <Form.Item {...tailLayout}
          style={{ width: 300 }}>
          <Button type="primary" style={{ marginRight: 15 }} htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
