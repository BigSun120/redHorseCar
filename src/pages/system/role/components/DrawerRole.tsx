import { Button, Table, Drawer, Space, Form, Input, TreeSelect, message } from 'antd';
import { use } from 'echarts';
import React, { useEffect, useState } from 'react';
import { getRoleApi, getAllRolesMenuApi, changeRoleMsgApi, addRoleApi, getRoleMenuApi } from '../../../../apis/role'

import { useReload } from '../../../../hooks/useReload';
/**
 * 接收的参数
 *  1. type：string ：类型
 *  2. list：渲染树
 *  3. （view，options，add已使用）
 * 
 * **/

const DrawerRole = (props: any) => {
  const [form] = Form.useForm();// 设置 -- 表单
  const [open, setOpen] = useState(false);
  const [menus, setMenus] = useState();// 权限菜单
  const [value, setValue] = useState<any>();// 树
  const [roleId, setRoleId] = useState<string>()// 每个的roleID
  // const [realMenus, setRealValue] = useState({})// 添加 value 属性后的 树
  const [eachRole, seteachRole] = useState<any>()

  const view = 'view';
  const options = 'options';
  const add = 'add';

  const { TextArea } = Input; // 文本框
  const { SHOW_PARENT } = TreeSelect;// 选择树
  // const [list, setList] = useState([])

  // 树
  const onChange = (newValue: string[]) => {
    setValue(newValue.join(','));
    console.log('onChange--newValue ', newValue);
  };
  const tProps = {
    treeData: menus,
    value,
    key: 'id',
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择权限!',
    style: {
      width: '100%',
    },
  };
  // console.log('props', props);

  // // 获取权限菜单
  // const getAllMenus = async () => {
  //   const data = await getAllRolesMenuApi()
  //   setList(data)
  // }

  // 角色： 提交表单
  const upData = () => {
    form.submit();
  }
  const onFinish = async (values: any) => {
    if (values.menuId) values.menuId = values.menuId.join(',')
    // 新增 角色
    if (props.type === add) {
      addRoleApi(values);
      setTimeout(() => { props.reload() }, 500)
      message.success('成功新增！')
      form.resetFields()
      // const data = await addRoleApi(values);console.log('addRoleApi:', data);
    }

    // 修改 角色
    if (props.type === options) {
      changeRoleMsgApi({ ...values, roleId })
      setTimeout(() => { props.reload() }, 500)
      message.success('修改成功！')
    }

    console.log('Success:', values);
    onClose()
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  // 抽屉 
  const showLargeDrawer = async () => {
    setOpen(true);
    // 设置表单初始值
    if (props.type === options) {
      // console.log('props.rows', props.options.rows[0]);
      let { roleName, remark, roleId } = props.options.rows[0]
      const rolesId = await getRoleMenuApi(String(roleId))// 角色对应菜单
      setRoleId(String(roleId))
      // console.log('menuId', roleId);
      form.setFieldsValue({ roleName, remark, menuId: rolesId })
    }

    // 查看 角色信息
    if (props.type === view) {
      let { roleName, remark, roleId, createTime, modifyTime } = props.view.rows[0]
      seteachRole({ roleName, remark, createTime, modifyTime })
      // console.log('viewview', roleName, remark, roleId, createTime, modifyTime);
      const rolesId = await getRoleMenuApi(String(roleId))// 角色对应菜单
      form.setFieldsValue({ menuId: rolesId })
    }

  };
  // console.log('menus', menus);

  // 关闭，可能需要 重置 某些数据
  const onClose = () => {
    setOpen(false);
    setRoleId(undefined)
    seteachRole(null)
  };

  // 给 menus 添加 属性value
  function addValue(data: any) {
    if (data) {
      Object.keys(data).map((a,) => {
        data[a]['value'] = data[a].key;
        if (data[a]?.children) {
          addValue(data[a].children)
        }
      })
    }
  }
  addValue(menus)

  // 初始化
  useEffect(() => {
    setMenus(props.menus?.rows.children)
  }, [])



  return (
    <>
      <Space>
        {props.type === add &&
          <Button
            type="primary"
            style={{ marginRight: 20 }}
            onClick={showLargeDrawer}>
            添加角色
          </Button>
        }
        {props.type === options &&
          <div>
            <img
              // data-type="set"
              onClick={showLargeDrawer}
              data-roleid={props.options.roleId}
              src={props.options.sets}
              style={{ width: 20 }}
              alt=""
            />
          </div>
        }
        {props.type === view &&
          <div>
            <img
              // data-type="view"
              onClick={showLargeDrawer}
              data-roleid={props.view.roleId}
              src={props.view.view}
              style={{ width: 20 }}
              alt=""
            />
          </div>
        }
      </Space>
      <Drawer
        title={props.type === view ? '角色信息' : '角色'}
        placement="right"
        size='large'
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            {props.type === options &&
              <Button type="primary" onClick={upData}>
                确认修改
              </Button>}
            {props.type === add &&
              <Button type="primary" onClick={upData}>
                确认添加
              </Button>}
          </Space>
        }
      >
        {(props.type == add || props.type == options && props.type !== view) &&
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
            <Form.Item label="角色名称" name="roleName"  >
              <Input />
            </Form.Item>

            <Form.Item label="角色描述" name="remark" >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item label="角色权限" name="menuId">
              <TreeSelect {...tProps} />
            </Form.Item>
          </Form>
        }
        {
          (props.type === view && eachRole) &&
          <ul className='ul-li'>
            <li>角色名称：{eachRole.roleName}</li>
            <li>角色描述：{eachRole.remark}</li>
            <li>创建时间：{eachRole.createTime}</li>
            <li>修改时间：{eachRole.modifyTime ? eachRole.modifyTime : "还未修改"}</li>
            <li>
              <div>
                <Form form={form}>
                  <Form.Item label="角色权限" name="menuId">
                    <TreeSelect disabled {...tProps} />
                  </Form.Item>
                </Form>
              </div>
            </li>
          </ul>
        }

      </Drawer>
    </>
  );
};

export default DrawerRole;