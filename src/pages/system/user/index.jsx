import { Button, Form, Input, Select, DatePicker, Table, TreeSelect, Space, message } from 'antd';
import { useEffect, useState } from 'react';

import { getUsersApi, delUserApi } from '../../../apis/usersMsg';
import { getDeptApi } from '../../../apis/dept';

import moment from 'moment';

import DrawerBtn from './components/DrawerBtn';

const { RangePicker } = DatePicker;
const { Option } = Select;
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};





const User = () => {
  const [form] = Form.useForm();

  const [List, setList] = useState([]);
  const [total, setTotal] = useState(0);
  // 部门
  const [dept, setDept] = useState({})

  // 多选框
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  async function getDept() {
    const data = await getDeptApi()
    setDept(data)
  }

  // 抽屉 
  const [open, setOpen] = useState(false);
  // 抽屉方法
  const showLargeDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    console.log();
    setOpen(false);
  };

  // 进入
  useEffect(() => {
    getDept()
  }, [])

  // console.log('deptdept', dept);
  // 按钮开始 -- 删除 按钮
  const start = async () => {
    console.log('startstart', selectedRowKeys);
    const data = await delUserApi(selectedRowKeys)
    console.log('删除 按钮', data);
    message.success('删除成功')
    getList()
  };



  // 点击了 多选框
  const onSelectChange = (a, items) => {
    setSelectedRowKeys(a);
    // console.log('selectedRowKeys changed: ', a, items);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // 是否有选中项
  const hasSelected = selectedRowKeys.length > 0;

  // 真正的渲染
  async function getList(body = {}) {
    const { total, rows } = await getUsersApi(body);
    // console.log('rowsrowsrows', rows);
    let list = rows.map(a => {
      let o = {};
      o['key'] = a.userId;
      o['username'] = a.username;
      o['email'] = a.email;
      o['deptName'] = a.deptName;
      o['mobile'] = a.mobile;
      o['deptId'] = String(a.deptId);
      o['userId'] = a.userId;
      return o
    })
    console.log('list:', list);
    setList((list))
    setTotal(total)
  }

  useEffect(() => {
    getList()
  }, [])

  // 切换页码
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('onChange-params', pagination, filters, sorter, extra);
    getList({ pageNum: pagination.current })
  };
  // console.log('List:', List, 'total:', total);

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value, record) => record.username.indexOf(value) === 0,
      // onFilter: (value, record) => {
      //   console.log('value, record', value, record);
      // },

      // sorter: (a, b) => a.username.length - b.name.length,
      // sorter: (a, b) => {
      //   return a.username.length - b.username.length
      // },
      // sortDirections: ['descend'],
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      // defaultSortOrder: 'descend',
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      filters: dept.rows?.children,
      // [{
      //   text: 'London',
      //   value: 'London',
      //   children: [
      //     {
      //       text: 'London1',
      //       value: 'London1',
      //     }
      //   ]
      // }, ],
      onFilter: (value, record) => {
        console.log('value', value);
        console.log(' record', record.deptId);
        // getList({ deptId: record.deptId, pageSize: '10', pageNum: '1' })
        // return record?.dept?.indexOf(value) === 0
        return value == record.deptId
      },
    },
    {
      title: '电话',
      dataIndex: 'mobile',
      sorter: (a, b) => a.mobile > b.mobile
    }
  ];

  // 筛选按钮--提交
  const onFinish = (values) => {
    // let createTimeFrom;
    // let createTimeTo;
    if (values.createTimeFromTwo?.length === 2) {
      values.createTimeFrom = moment(values.createTimeFromTwo[0]).format('YYYY-MM-DD')
      values.createTimeTo = moment(values.createTimeFromTwo[1]).format('YYYY-MM-DD')
      delete values.createTimeFromTwo
    }
    console.log(values);
    getList(values);
  };
  // 重置
  const onReset = () => {
    form.resetFields();
    getList()
  };

  return (
    <div>
      {/* 筛选 */}
      <Form style={{ display: 'flex', flexWrap: 'wrap' }}
        name="control-hooks" onFinish={onFinish} form={form}>
        {/* // Form {...layout} form={form} name="control-hooks" onFinish={onFinish} > */}
        <Form.Item
          name="username"
          label="用户名"
        >
          <Input style={{ width: 200 }} placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item label="部门" name="deptId">
          <TreeSelect
            placeholder="请选择部门！"
            treeData={dept.rows?.children}
          />
        </Form.Item>

        <Form.Item name="createTimeFromTwo" label="创建时间"  >
          <RangePicker style={{ width: 200 }} showTime format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item {...tailLayout}
          style={{ width: 300 }}>
          <Button type="primary" style={{ marginRight: 15 }} htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>

      </Form >
      <div>
        <Space>
          {/* <Button
            style={{ marginRight: 15, color: 'blue' }}
            // onClick={showLargeDrawer}
          >
            新增
          </Button> */}
          <DrawerBtn></DrawerBtn>
        </Space>

        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
        >
          删除
        </Button>
      </div>
      {/* 表格  */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={List}
        onChange={onChange}
        pagination={{
          total
        }}
      />
    </div >
  );
};

export default User;