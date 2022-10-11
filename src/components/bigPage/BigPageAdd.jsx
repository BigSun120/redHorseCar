import { Button, Drawer, Form, Space, Input, TreeSelect } from 'antd';
import React, { useState } from 'react';

import setImg from '../../assets/images/icons/sets.png'



/** 
 * 接收的参数
 *  1. usealAdd (input遍历项)（数组对象） ：
 *      [{label: '键', name: 'keyy', rules: true},]
 *  2. getChildAdd （表单值）：传递给父亲即可 
 *  3. type（string）：类型 ： add，set
 *  4. oneVal（对象）：列表每一项的值
 * **/
export default function BigPageAdd(props) {
  const [open, setOpen] = useState(false); // 抽屉打开情况
  const [form] = Form.useForm();  // 表单 管理

  // 抽屉
  const showDrawer = () => {
    setOpen(true);
    if (props.type === 'set') {
      console.log('showDrawer', props.oneVal);
      form.setFieldsValue(props.oneVal)
    }
  };
  const onClose = () => {
    console.log('onClose');
    form.resetFields()
    setOpen(false);
  };
  const upData = () => {
    console.log('upData');
    form.submit()
    // form.resetFields()
    setOpen(false);
  }

  // 表单 -- 提交
  const onFinish = (values) => {
    console.log('Success:', values);
    if (props.type === 'add') {
      props.addApi(values)
      props?.addDeptApi(values)
      props.getList()
      setOpen(false);
    }
    if (props.type === 'set') {
      props.changeApi(values)
      // console.log(12112, props.getList);
      props.getList()
      setOpen(false);
    }
    // onClose()
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {props.type === 'add' && <Button type="primary" onClick={showDrawer}>
        新增
      </Button>}
      {props.type === 'set' && <img
        src={setImg}
        style={{ width: 22 }}
        onClick={showDrawer}
      />

      }
      <Drawer
        title={props.type === 'add' ? "新增" : props.type === 'set' ? "修改" : ''}
        size='large'
        placement="right"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={upData}>
              提交
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {props.usealAdd &&
            props.usealAdd.map((a, index) => {
              const { rules, disabled, ...items } = a
              // console.log(1111, a);
              return (
                <Form.Item
                  key={index}
                  {...items}

                  rules={rules &&
                    [{
                      required: true,
                      message: `请输入${a.label}`
                    }]
                  }
                >
                  <Input disabled={disabled} />
                </Form.Item>
              )
            })
          }
          {props.unUsalAdd && props.list &&
            <Form.Item label="上级部门" name="parentId">
              <TreeSelect placeholder="请选择部门！" treeData={props.list} />
            </Form.Item>
          }
        </Form>
      </Drawer>
    </>
  )
}
