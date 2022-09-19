import React, { useEffect, useState } from 'react'
import ToSearch from '../../../components/ToSearch'
import { Button, Table, Drawer, Space, Form, Input } from 'antd';
import { getRoleApi, getAllRolesMenuApi } from '../../../apis/role'
import type { DrawerProps } from 'antd/es/drawer';

import DrawerRole from './components/DrawerRole'

import type { ColumnsType } from 'antd/es/table';
import sets from '../../../assets/images/icons/sets.png'
import view from '../../../assets/images/icons/view.png'

interface IptVal {
  roleName?: string | undefined,
  createTimeFromTwo?: undefined,
  createTimeFrom?: string,
  createTimeTo?: string
}

interface ListType {
  key?: string,
  createTime?: string,
  createTimeFrom?: string | null,
  createTimeTo?: string | null,
  menuId?: string | null,
  modifyTime?: string | null,
  remark?: string,
  roleId?: string,
  roleName?: string,
}

const columns: ColumnsType<ListType> = [
  {
    title: '角色',
    dataIndex: 'roleName',
  },
  {
    title: '描述',
    dataIndex: 'remark',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '修改时间',
    dataIndex: 'modifyTime',
  },
  {
    title: '操作',
    dataIndex: 'options',
  },
];

export default function Role() {

  const { TextArea } = Input; // 文本框
  const [list, setList] = useState([])  // 列表数据
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);// 多选框的 keys 值
  const [open, setOpen] = useState<boolean | undefined>(false); // 设置--模态框 的开启状态
  const [openList, setopenList] = useState([]);// 设置--打开的 那一项的数据
  const [menus, setMenus] = useState();// 权限菜单

  const [form] = Form.useForm();// 设置 -- 表单

  // 获取权限菜单
  const getAllMenus = async () => {
    const data = await getAllRolesMenuApi()
    setMenus(data)
  }

  // 设置--模态框  开启-关闭
  // const showLargeDrawer = () => {
  //   setOpen(true);
  // };
  // const onClose = () => {
  //   setOpen(false);
  // };
  // const upData = () => {
  //   form.submit();
  //   console.log('更新数据');
  // }
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };
  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  // 删除角色
  const delRoles = () => {
    console.log('delRoles');
  };

  // 添加角色
  const addRole = () => {
    console.log('addRole');
  };


  // 多选框
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;


  // 要展现的 input框
  const showInp = {
    role: true,
    date: true
  }


  // 操作 点击事件
  const optionsClick = (e: any, roleId: string, rows: any) => {
    const type = e.target.getAttribute('data-type');
    switch (type) {
      case 'set':
        // showLargeDrawer()
        console.log('点击了set---roleId', roleId, rows);
        return
      case 'view':
        console.log('点击了view');
        return
    }
  }

  // 操作渲染
  const optionsRender = (roleId: string, rows: any) => {
    console.log('rowsrows', rows);
    return <div onClick={(e) => optionsClick(e, roleId, rows)}>
      <img data-type="set" data-roleid={roleId} src={sets} style={{ width: 20 }} alt="" />
      <img data-type="view" data-roleid={roleId} src={view} style={{ width: 20 }} alt="" />
    </div>
  }

  // 获取数据
  const getlist = async (body?: any) => {
    const { rows } = await getRoleApi(body);
    let o: any = [];
    rows.map((a: any) => {
      o.push({
        ...a,
        options: optionsRender(a.roleId, rows.filter((b: any) => b.roleId === a.roleId)),
        key: String(a.roleId),
        roleId: String(a.roleId),
      })
    })
    setList(o)
    // console.log('getlist===list', list);
  }


  // 接收儿子 输入框的值
  const getChildSearch = (value: IptVal) => {
    console.log(value);
    getlist(value)
  }
  // 重置
  const onReset = () => {
    getlist()
  }


  // 初始化
  useEffect(() => {
    getlist()
    getAllMenus()
  }, [])

  return (
    <div>

      {/* 操作 -- 设置 */}
      {/* <DrawerRole type={{ add: 'options' }} ></DrawerRole> */}
      {/* 搜索框 */}
      <ToSearch
        showInp={showInp}
        onReset={onReset}
        getChildSearch={getChildSearch}
      />
      {/* 设置--模态框 */}
      {/* <Drawer
        title='设置'
        placement="right"
        size='large'
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={upData}>
              更新数据
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
      </Drawer> */}
      <div>
        <div style={{ marginBottom: 16 }}>
          {/* 添加角色 */}
          {menus &&
            <DrawerRole type={'add'} ></DrawerRole>
            // <DrawerRole type={{ add: 'add' }} menus={menus}></DrawerRole>
          }
          <Button
            type="primary"
            onClick={delRoles}
            disabled={!hasSelected}
          >
            删除角色
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={list}
        />
      </div>
    </div>
  )
}
