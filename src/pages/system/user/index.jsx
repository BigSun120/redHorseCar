import { Dropdown, Menu, Space, Button, Form, Popconfirm, Modal, Col, Row, Input, Select, DatePicker, Table, TreeSelect, message, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

import sets from '../../../assets/images/icons/sets.png'
import view from '../../../assets/images/icons/view.png'
import { getUsersApi, delUserApi, resetPwdApi, downloadExcelApi } from '../../../apis/usersMsg';
import { getDeptApi } from '../../../apis/dept';
import user, * as userStore from '../../../store/modules/user'

import DrawerBtn from './components/DrawerBtn';
import SetOptions from './components/SetOptions';
import ToSearch from '../../../components/ToSearch';

import '../../../assets/styles/system/user.less'

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
  // const [form] = Form.useForm();

  // store 状态机
  const listStore = useSelector(state => state.user.userList)
  const dispatch = useDispatch();

  const [List, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [dept, setDept] = useState({}) // 部门 sear
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);// 多选框 的 key 值
  const [selectedRowNames, setSelectedRowNames] = useState([]);// 多选框 的 key 值
  const [open, setOpen] = useState(false);  // 抽屉 
  const [isModalOpen, setIsModalOpen] = useState(false);// 用户信息模态框
  const [userMsg, setUserMsg] = useState()// 用户信息
  const [resetPwdModalOpen, setresetPwdModalOpen] = useState(false); // 重置密码模态框


  // 重置密码模态框
  // 更多选项
  const resetPwdshowModal = () => {
    // console.log('selectedRowKeys', selectedRowKeys);
    console.log('selectedRowNames', selectedRowNames);
    if (selectedRowKeys.length === 0) {
      message.info('请选择用户！')
      return
    }
    setresetPwdModalOpen(true);
  };
  const resetPwdhandleOk = () => {
    setresetPwdModalOpen(false);
    let arr = [];
    selectedRowNames.map(a => arr.push(a.username))
    resetPwdApi({ usernames: arr })
    message.success('重置成功！')
  };
  const resetPwdhandleCancel = () => {
    setresetPwdModalOpen(false);
    message.info('取消成功！')
  };

  // 导出下载
  const download = () => {
    downloadExcelApi()
  }
  // 更多选项
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <span onClick={resetPwdshowModal}>密码重置</span>
          ),
        },
        {
          key: '2',
          label: (
            <span onClick={download}>导出Excel</span>
          ),
        },
      ]}
    />
  );

  // 接收子组件的数据
  const getChildSearch = (data) => {
    console.log('getChildSearch', data);
    getList(data)
  }

  // 获取部门 sear
  async function getDept() {
    const data = await getDeptApi()
    // console.log('getDept()', data);
    setDept(data)
  }

  // 抽屉方法
  // const showLargeDrawer = () => {
  //   setOpen(true);
  // };
  // const onClose = () => {
  //   console.log();
  //   setOpen(false);
  // };

  // console.log('deptdept', dept);
  // 按钮开始 -- 删除 按钮
  // const start = async () => {
  //   // console.log('startstart', selectedRowKeys);
  //   // const data = await delUserApi(selectedRowKeys)
  //   // console.log('删除 按钮', data);
  //   // message.success('删除成功')
  //   // getList()
  // };

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
    setSelectedRowNames(items)
    // console.log('selectedRowKeys changed:itemsitems ', a, items);
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
      o['avatar'] = a.avatar;
      o['roleId'] = a.roleId;
      o['roleName'] = a.roleName;
      o['createTime'] = a.createTime;
      o['status'] = String(a.status);
      o['statusName'] = String(a.status) === '0' ? <Tag color='red'>无效</Tag> : <Tag color='green'>有效</Tag>;
      o['opations'] = optionsRender(o);
      userStore.setUserList(o)
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


  // 用户信息模态框 -- 方法
  const showModal = (msg) => {
    setIsModalOpen(true);
    setUserMsg(msg);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 操作按钮 渲染
  function optionsRender(userMsg) {
    // console.log('userMsg', userMsg);
    return <div>
      <SetOptions userMsg={userMsg}></SetOptions>
      <img style={{ width: 20 }} src={view} alt="" onClick={() => showModal(userMsg)} />
    </div>
  }

  // 切换页码
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('onChange-params', pagination, filters, sorter, extra);
    // console.log('123123312321qwwwwwwwww');
    if (filters.statusName) {
      getList({
        pageNum: pagination.current,
        status: filters.statusName[0],
      })
    }

    if (filters.deptName) {
      getList({
        pageNum: pagination.current,
        deptId: filters.deptName[0]
      })
    }


    if (filters.deptName && filters.statusName) {
      getList({
        pageNum: pagination.current,
        deptId: filters.deptName[0],
        status: filters.statusName[0],
      })
    } else {
      getList({
        pageNum: pagination.current,
      })
    }
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
        { text: '有效', value: '1' },
        { text: '无效', value: '0' },
      ],
      filterMultiple: false,
      onFilter: (value, record) => value == record.status
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
  // const onFinish = (values) => {
  //   // let createTimeFrom;
  //   // let createTimeTo;
  //   if (values.createTimeFromTwo?.length === 2) {
  //     values.createTimeFrom = moment(values.createTimeFromTwo[0]).format('YYYY-MM-DD')
  //     values.createTimeTo = moment(values.createTimeFromTwo[1]).format('YYYY-MM-DD')
  //     delete values.createTimeFromTwo
  //   }
  //   console.log(values);
  //   getList(values);
  // };

  // 重置
  const onReset = () => {
    getList()
  };

  return (
    <div>
      {/* 信息模态框 */}
      <Modal
        title="用户信息"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Row className='ul-li'>
          <Col span={6}>
            <img
              style={{ width: 120 }}
              src={`http://xawn.f3322.net:8002/distremote/static/avatar/${userMsg?.avatar ? userMsg?.avatar : 'default.jpg'}`} alt="" />
          </Col>
          <Col span={9}>
            <ul>
              <li>账户：{userMsg?.username}</li>
              <li>角色：{userMsg?.roleName}</li>
              <li>性别：{userMsg?.ssex === '0' ? '男' : userMsg?.ssex === '1' ? '女' : '保密'}</li>
              <li>电话：{userMsg?.mobile}</li>
              <li>邮箱：{userMsg?.email}</li>
            </ul>
          </Col>
          <Col span={9}>
            <ul>
              <li>账户：{userMsg?.deptName}</li>
              <li>状态：{userMsg?.statusName}</li>
              <li>创建时间：{userMsg?.createTime}</li>
              <li>最近登录：{userMsg?.createTimeFrom}</li>
              <li>描述：{userMsg?.description}</li>
            </ul>
          </Col>
        </Row>
      </Modal>

      {/* 重置密码 */}
      <Modal title="确认以下用户，重置密码为初始密码：1234qwer ？"
        open={resetPwdModalOpen}
        onOk={resetPwdhandleOk}
        onCancel={resetPwdhandleCancel}>
        {
          selectedRowNames.map(a => {
            return <span key={a.userId}>{a.username} </span>
          })
        }
      </Modal>

      {/* 筛选 */}
      <ToSearch getChildSearch={getChildSearch} onReset={onReset} />
      {/* <Form style={{ display: 'flex', flexWrap: 'wrap' }}
        name="control-hooks" onFinish={onFinish} form={form}>
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

      </Form > */}
      <div>
        {/* 新增 */}
        <Space>
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
          // onClick={start}
          // disabled={!hasSelected}
          >
            删除
          </Button>
        </Popconfirm>

        {/* 更多选项 */}
        <Dropdown overlay={menu} >
          <Button
            onClick={(e) => e.preventDefault()}
            type='primary'
            style={{ marginLeft: 15 }}
          >
            <Space>
              更多选项
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
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