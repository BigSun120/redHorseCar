import React, { useEffect, useState } from 'react'
import ToSearch from '../../../components/ToSearch'
import { Button, Table, Drawer, Modal, Form, Input, message } from 'antd';
import { getRoleApi, getAllRolesMenuApi, delRoleByIdApi } from '../../../apis/role'
import type { DrawerProps } from 'antd/es/drawer';
import { useComptime } from '../../../hooks/useComptime'; // 比较时间 大小

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



export default function Role() {
  const { TextArea } = Input; // 文本框
  const [list, setList] = useState([])  // 列表数据
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);// 多选框的 keys 值
  const [selectedRowName, setSelectedRowName] = useState<any>([]);// 多选框的 keys 值
  const [open, setOpen] = useState<boolean | undefined>(false); // 设置--模态框 的开启状态
  const [openList, setopenList] = useState([]);// 设置--打开的 那一项的数据
  const [menus, setMenus] = useState();// 权限菜单
  const [total, setTotal] = useState();// 列表数据总量
  const [isModalOpen, setIsModalOpen] = useState(false);// 删除模态框


  function reload() {
    console.log('刷新页面');
    // location.reload()
    getlist()
  }

  const columns: any = [
    // const columns: ColumnsType<ListType> = [
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
      // sorter: (a: any, b: any) => comptime(a.createTime, b.createTime)
      sorter: (a: any, b: any) => useComptime(a.createTime, b.createTime)
    },
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
      sorter: (a: any, b: any) => useComptime(a.modifyTime, b.modifyTime)
    },
    {
      title: '操作',
      dataIndex: 'options',
    },
  ];
  // const [form] = Form.useForm();// 设置 -- 表单

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


  // 多选框
  const onSelectChange = (newSelectedRowKeys: React.Key[], items: any) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRowName);
    let s: any = [];
    items.map((a: any) => s.push(a.roleName))
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRowName(s)
  };
  const rowSelection = {
    selectedRowKeys,
    selectedRowName,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  // 删除角色--弹出模态框
  const delRoles = () => {
    console.log('delRoles', selectedRowKeys, selectedRowName);
    setIsModalOpen(true);
  };
  // 删除 role--模态框
  const handleOk = async () => {
    setIsModalOpen(false);
    const data = await delRoleByIdApi(selectedRowKeys)
    console.log('handleOk', data);
    message.success("删除成功！")
    getlist()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    message.info("取消删除！")
  };

  // 添加角色
  const addRole = () => {
    console.log('addRole');
  };

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


  // 获取数据
  const getlist = async (body?: any) => {
    // const { rows } = await getRoleApi(body);
    const data = await getRoleApi(body);
    setTotal(data.total)
    // console.log('data', data);

    let o: any = [];
    data.rows.map((a: any) => {
      o.push({
        ...a,
        options: optionsRender(a.roleId, data.rows.filter((b: any) => b.roleId === a.roleId)),
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
  // 操作渲染
  const optionsRender = (roleId: string, rows: any) => {
    // console.log('rowsrows', rows);
    return <div onClick={(e) => optionsClick(e, roleId, rows)}>
      {menus &&
        <DrawerRole
          type='options'
          menus={menus}
          reload={reload}
          options={{ roleId, sets, rows }} />
      }
      {menus &&
        <DrawerRole
          type='view'
          menus={menus}
          reload={reload}
          view={{ roleId, view, rows }} />
      }
    </div>
  }

  // 表格换页
  function onchange(a: any) {
    // console.log(a);
    getlist({
      pageNum: a.current,
      pageSize: a.pageSize
    })
  }

  // 初始化
  useEffect(() => {
    getlist()
    getAllMenus()
  }, [])

  useEffect(() => {
    getlist()
  }, [menus])

  return (
    <div>
      {/* 搜索框 */}
      <ToSearch
        showInp={showInp}
        onReset={onReset}
        getChildSearch={getChildSearch}
      />
      {/* 设置--模态框 */}
      <Modal title="确认删除以下用户？" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {selectedRowName.map((a: any, index: number) => {
          return <span key={index}>
            {a}，
          </span>
        })}
      </Modal>

      <div>
        <div style={{ marginBottom: 16 }}>
          {/* 添加角色 */}
          {menus &&
            <DrawerRole reload={reload} type={'add'} menus={menus}></DrawerRole>
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
          onChange={onchange}
          pagination={{
            total
          }}
        />
      </div>
    </div>
  )
}
