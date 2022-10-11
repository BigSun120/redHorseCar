import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Dropdown, Drawer, message, Popconfirm, Menu, Form, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
// import type { ColumnsType } from 'antd/es/table';

import ToSearch from '../../../components/ToSearch'
import { getMenuApi } from '../../../apis/menu';
import { downloadExcelApi } from '../../../apis/usersMsg';
import setImg from '../../../assets/images/icons/sets.png'

import AddMenuBtn from './components/AddMenuBtn';
import DrawerRole from './components/DrawerRole';

export default function UserMenu() {

  const [form] = Form.useForm();// 表单管理
  const [list, setList] = useState([]); // 存储列表
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);//多选框的 key值



  // 导出下载
  const download = () => {
    downloadExcelApi()
  }
  // 下拉框
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <span onClick={download}>导出Excel</span>
          ),
        }
      ]}
    />
  );

  // 添加 value
  function addVal(list) {
    // console.log('123123', list);
    list = list.map(a => {
      // console.log(a);
      a.key = String(a.id)
      a.value = String(a.id)
      if (a.children) {
        addVal(a.children)
      }
      return a
    })
    return list
  }

  // 获取表格数据
  async function getAllMenus(body) {
    const data = await getMenuApi(body)
    console.log('getAllMenus', data);//.map(a => a.value = a.id)
    setList(addVal(data.rows.children))
    // setList(o)
  }


  console.log('.........', list);
  // useEffect(() => {
  //   // getAllMenus()
  // }, [list])

  // 多选框处理
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  // 删除 
  const del = () => {
    console.log('点击了删除');
  }

  // 表格渲染数据
  const columns = [
    // const columns: ColumnsType<DataType> = [
    {
      title: '名称',
      width: 100,
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
    },
    {
      title: '图标',
      width: 100,
      dataIndex: 'icon',
      key: 'icon',
      render: (a, item) => {
        if (!item.icon) {
          return <Tag color='orange'>未设置图标</Tag>
        }
        return item.icon
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      // console.log(a, item);
      render: (a, item) => item.type == '0' ? <Tag color='green'>菜单</Tag> : <Tag color='red'>按钮</Tag>
    },
    {
      title: '地址',
      dataIndex: 'path',
      key: 'path',
      width: 150,
      render: (a, item) => {
        if (item.type === '1') {
          return <Tag color='orange'>按钮级权限</Tag>
        }
        return item.path
      }
    },
    {
      title: 'Vue组件',
      dataIndex: 'component',
      key: 'component',
      width: 150,
      render: (a, item) => {
        if (item.type === '1') {
          return <Tag color='orange'>按钮级权限</Tag>
        }
        return item.component
      }
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
      width: 150,
      render: (a, item) => {
        if (!item.permission) {
          return <Tag color='orange'>不存在</Tag>
        }
        return item.permission
      }
    },
    {
      title: '排序',
      dataIndex: 'order',
      key: 'order',
      width: 150,
      render: (a, item) => {
        if (!item.order) {
          return <Tag color='orange'>不存在</Tag>
        }
        return item.order
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
    },
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
      key: 'modifyTime',
      width: 150,
      render: (a, item) => {
        if (!item.modifyTime) {
          return <Tag color='orange'>未修改</Tag>
        }
        return item.modifyTime
      }
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 60,
      // render: () => <img style={{ width: 20 }} src={setImg} alt="" />
      render: (a, menuItems) => <AddMenuBtn
        reloadList={reloadList}
        list={list}
        type='changeMsg'
        menuItems={menuItems} />
    },
  ];

  // 搜索部分
  // 重置
  const onReset = () => {
    console.log('onResetvonReset');
    getAllMenus()
  }
  const getChildSearch = (val) => {
    console.log('getChildSearch', val);
    getAllMenus(val)
  }

  // 新增部分
  // const [open, setOpen] = useState(false);// 抽屉的开关
  // // 对话框
  // const addBtn = (e) => {
  //   console.log('addBtn');
  //   setOpen(true);
  // };
  // const addMenu = (e) => {
  //   console.log('addMenu');
  //   setOpen(true);
  // };
  // const onClose = () => {
  //   setOpen(false);
  // };

  function reloadList() {
    getAllMenus()
  }
  useEffect(() => {
    getAllMenus()
  }, [])

  return (
    <div>
      {/* <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer> */}
      {/* 搜索框 */}
      <ToSearch
        showInp={{ userMenu: true, date: true }}
        onReset={onReset}
        getChildSearch={getChildSearch}
      />
      <div>
        {/* 新增 */}
        {list &&
          <AddMenuBtn reloadList={reloadList} list={list}></AddMenuBtn>}

        {/* 删除 */}
        <Button style={{ marginRight: 15 }} type="primary" onClick={del} disabled={!hasSelected} >
          删除
        </Button>

        {/* 更多操作 */}
        <Dropdown overlay={menu}>
          <Button>
            <Space>
              更多操作
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      {list &&
        <Table
          form={form}
          columns={columns}
          rowSelection={rowSelection}
          dataSource={list}
          scroll={{ x: 1500, y: '100%' }}
        />
      }
    </div>
  )
}
