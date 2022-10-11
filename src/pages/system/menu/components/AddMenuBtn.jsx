import React, { useEffect, useState } from 'react'
import { Table, Tag, TreeSelect, Button, Input, Drawer, message, Popconfirm, Menu, Form, Space } from 'antd';
import { addMenuApi, changeMenuApi } from '../../../../apis/menu';
import setImg from '../../../../assets/images/icons/sets.png'




export default function AddMenuBtn(props) {
  const [form] = Form.useForm();// 表单管理
  const [open, setOpen] = useState(false);// 抽屉的开关
  const [value, setValue] = useState();// 树

  const [typeAdd, setTypeAdd] = useState();// 添加 菜单 or 按钮
  const [typeMenuChange, setTypeMenuChange] = useState();// 修改 菜单 or 按钮


  const { SHOW_PARENT } = TreeSelect;// 选择树


  // 新增部分
  // 对话框
  const addBtn = (e) => {
    console.log('addBtn');
    setTypeAdd('1')//按钮
    form.setFieldsValue({ type: '1' })
    setOpen(true);
  };
  const addMenu = (e) => {
    console.log('addMenu');
    setTypeAdd('0')//菜单
    form.setFieldsValue({ type: '0' })
    setOpen(true);
  };

  const onClose = () => {
    console.log('onClose');
    setTypeAdd('')
    setTypeAdd(null)
    setTypeMenuChange(null);
    form.resetFields();
    props.reloadList()
    setOpen(false);
  };

  // 菜单-设置 打开
  const menuSetOpen = () => {
    console.log('menuSetOpen', props.menuItems);
    changeMenuBtn()
    setOpen(true);
    // 菜单修改
    if (props.menuItems.type === '0') {
      console.log('asdaugfuasbdgf');
      const { text, path, type, id, parentId, component, permission, order, icon } = props.menuItems
      form.setFieldsValue({
        path, component, icon,
        menuName: text,
        perms: permission,
        orderNum: order,
        parentId: parentId === '0' ? undefined : parentId,
        type, menuId: id
      })
    }

    // 按钮修改
    if (props.menuItems.type === '1') {
      const { text, parentId, type, permission, id } = props.menuItems
      console.log('asdaugfuasbdgf', text, parentId, type, permission, id);
      form.setFieldsValue({
        menuName: text,
        perms: permission,
        parentId: parentId === '0' ? undefined : parentId,
        type,
        menuId: id
      })
    }
  }

  // 提交表单
  const onFinish = async (values) => {
    console.log('提交了Success:', values);
    // 新增
    if (typeAdd === '0' || typeAdd === '1') {
      const data = await addMenuApi(values)
      console.log('000', data);
    }
    // 修改
    if (props.menuItems?.type === '0' || props.menuItems?.type === '1') {
      console.log('asdasd');
      const data = await changeMenuApi(values);
      console.log('菜单修改：', data);
    }

    onClose()
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // 点击提交表单
  const upData = () => {
    form.submit()
    console.log('点击了提交表单upData');
  }

  const onChange = (newValue) => {
    console.log('onChange ', value);
    if (newValue.length > 1) {
      message.error('只能选择一个！')
    }
    setValue(newValue.join(','));// 
    setValue(newValue);
  };
  const tProps = {
    treeData: props.list,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '选择上级菜单',
    style: {
      width: '100%',
    },
  };
  // console.log('props', props);
  function changeMenuBtn() {
    if (props.type === 'changeMsg') {
      console.log('props.list', props.menuItems.type);
      props.menuItems.type === '0' ? setTypeMenuChange('0') : setTypeMenuChange('1')
    }
  }

  return (
    <>
      {props.type !== 'changeMsg' && <Popconfirm
        title="新增菜单  OR  新增按钮?"
        onCancel={addMenu}
        onConfirm={addBtn}
        okText="按钮"
        cancelText="菜单"
      >
        <Button
          style={{ marginRight: 15 }}
          type="primary"
        >
          新增
        </Button>
      </Popconfirm>}

      {props.type === 'changeMsg' &&
        <img
          onClick={menuSetOpen}
          style={{ width: 20 }}
          src={setImg} alt=""
        />
      }


      <Drawer
        title={typeAdd === '0' ? "新增菜单"
          : typeAdd === '1' ? '新增按钮' :
            typeMenuChange === '0' ? '修改菜单' : '修改按钮'
        }
        placement="right"
        onClose={onClose}
        size="large"
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={upData}>
              确认
            </Button>
          </Space>
        }
      >

        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          // initialValues={{   }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={typeAdd === '0' ? "菜单名称"
              : typeAdd === '1' ? '按钮名称' :
                typeMenuChange === '0' ? '菜单名称' : '按钮名称'
            }
            name="menuName"
            rules={[{
              required: true,
              message: '请输入菜单名称!'
            }]}
          >
            <Input />
          </Form.Item>

          {(typeAdd === '0' || typeMenuChange === '0') &&
            <Form.Item
              label="菜单URL"
              name="path"
              rules={[{
                required: true,
                message: '请输入菜单URL!'
              }]}
            >
              <Input />
            </Form.Item>}

          {(typeAdd === '0' || typeMenuChange === '0') &&
            <Form.Item
              label="组件地址"
              name="component"
              rules={[{
                required: true,
                message: '请输入组件地址'
              }]}
            >
              <Input />
            </Form.Item>}

          <Form.Item
            label="相关权限"
            name="perms"
          >
            <Input />
          </Form.Item>

          {(typeAdd === '0' || typeMenuChange === '0') &&
            <Form.Item
              label="菜单图标"
              name="icon"
            >
              <Input placeholder='待完善' />
            </Form.Item>}

          {(typeAdd === '0' || typeMenuChange === '0') &&
            <Form.Item
              label="菜单排序"
              name="orderNum"
            >
              <Input />
            </Form.Item>}

          {props.list &&
            <Form.Item label="上级菜单" name="parentId">
              <TreeSelect  {...tProps} />
            </Form.Item>
          }

          <Form.Item
            label="菜单类型"
            name="type"
            style={{ display: 'none' }}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="menuId"
            name="menuId"
            style={{ display: 'none' }}
          >
            <Input disabled />
          </Form.Item>

        </Form>
      </Drawer>

    </>
  )
}
