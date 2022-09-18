import { Button, Form, Popconfirm, Input, Select, DatePicker, Table, TreeSelect, Space, message, Tag } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useRef } from 'react';

import sets from '../../../assets/images/icons/sets.png'
import view from '../../../assets/images/icons/view.png'
import { getUsersApi, delUserApi } from '../../../apis/usersMsg';
import { getDeptApi } from '../../../apis/dept';
import DrawerBtn from './components/DrawerBtn';
import SetOptions from './components/SetOptions';

import { useSelector, useDispatch } from 'react-redux'
import user, * as userStore from '../../../store/modules/user'


const { RangePicker } = DatePicker;
const { Option } = Select;
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

// import { getDeptApi } from '../../../../apis/dept';
// import { changeUserApi } from '../../../../apis/usersMsg';
// import { getRoleApi } from '../../../../apis/role';

// import sets from '../../../../assets/images/icons/sets.png'
// import view from '../../../../assets/images/icons/view.png'



const User = () => {
  const [form] = Form.useForm();

  // store 状态机
  const listStore = useSelector(state => state.user.userList)
  const dispatch = useDispatch();

  // 获取节点
  const idRef = useRef('0');

  const [List, setList] = useState([]);
  const [total, setTotal] = useState(0);
  // 部门
  const [dept, setDept] = useState({})

  // 多选框
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  async function getDept() {
    const data = await getDeptApi()
    console.log('getDept()', data);
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



  // console.log('deptdept', dept);
  // 按钮开始 -- 删除 按钮
  const start = async () => {
    // console.log('startstart', selectedRowKeys);
    // const data = await delUserApi(selectedRowKeys)
    // console.log('删除 按钮', data);
    // message.success('删除成功')
    // getList()
  };

  // 删除按钮 气泡确认
  const confirm = async (e) => {
    console.log(e);
    console.log('startstart', selectedRowKeys);
    const data = await delUserApi(selectedRowKeys)
    console.log('删除 按钮', data);
    message.success('删除成功')
    getList()
  };
  const cancel = (e) => {
    console.log(e);
    message.info('取消删除成功！');
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
      // console.log(a.createTimeFrom);
      let o = {};
      o['key'] = a.userId;
      o['username'] = a.username;
      o['email'] = a.email;
      o['deptName'] = a.deptName;
      o['mobile'] = a.mobile;
      o['deptId'] = String(a.deptId);
      o['userId'] = a.userId;
      o['ssex'] = a.ssex;
      o['roleId'] = a.roleId;
      // opations 
      o['createTime'] = a.createTime;
      o['status'] = String(a.status);
      o['statusName'] = String(a.status) === 0 ? <Tag color='red'>无效</Tag> : <Tag color='green'>有效</Tag>;
      o['opations'] = optionsRender(o);
      return o
    })
    console.log('list:', list);
    setList((list))
    setTotal(total)
  }

  useEffect(() => {
    getList()
    getDept()
  }, [])

  // function watchList() {
  //   const idDiv = idRef.current.getAttribute('data-id')
  //   console.log('idDiv:', idDiv);
  // }
  // 操作按钮 渲染
  function optionsRender(userMsg) {
    // console.log('userMsg', userMsg);
    return <div>
      {/* <div
        ref={idRef}
        data-id={userId}
        onClick={watchList}> */}
      <SetOptions userMsg={userMsg}></SetOptions>
      {/* </div> */}
      <img style={{ width: 20 }} src={view} alt="" />
    </div>
  }


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
      onFilter: (value, record) => value == record.deptId,
    },
    {
      title: '电话',
      dataIndex: 'mobile',
      sorter: (a, b) => a.mobile > b.mobile
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      filters: [
        { text: '有效', value: '有效' },
        { text: '无效', value: '无效' },
      ],
      onFilter: (value, record) => value == record.statusName
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'opations',
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

        <Popconfirm
          title="确定要删除吗?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="是"
          cancelText="否"
        >
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
          >
            删除
          </Button>
        </Popconfirm>

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