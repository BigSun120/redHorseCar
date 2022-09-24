import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Tabs, Row, Dropdown, message, Space, Breadcrumb, Card } from 'antd';
// import type { MenuProps } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { getRoutersAside } from '../../configs/routers';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
// import { store } from '../../store';
import * as user from '../../store/modules/user'
// import { useSelector, useDispatch } from 'react-redux'

import { breadcrumbs } from '../../configs/breadCrumb';

export default function HomePageView() {
  const navigate = useNavigate()
  // const dispatch = useDispatch()

  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [aside, setAside] = useState([])

  let { pathname, hash } = useLocation()

  // 本地用户信息
  const { username, avatar, deptName, roleName, lastLoginTime } = JSON.parse(localStorage.user)

  // 用户名字处下拉框
  const onClickUserMsg = ({ key }) => {
    switch (key) {
      // 退出登录
      case '4':
        console.log(444);
        localStorage.clear()
        message.success('退出登录成功！')
        navigate('/login')
        break;
    }

  };
  const menu = (
    <Menu
      onClick={onClickUserMsg}
      items={[
        {
          label: <NavLink to={'/profile'}>个人中心</NavLink>,
          key: '1',
          // icon: 'require('../../states/images/icons/home')'
          icon: <i className='iconfont icon-smile'></i>
        },
        {
          label: '密码修改',
          key: '2',
          icon: <i className='iconfont icon-tags'></i>
        },
        {
          label: '系统定制',
          key: '3',
          icon: <i className='iconfont icon-shezhi'></i>
        },
        {
          label: '退出登录',
          key: '4',
          icon: <i className='iconfont icon-tuichu'></i>
        },
      ]}
    />
  );


  // 获取状态机 中的 用户信息
  // const name = useSelector((state ) => state.user)
  // user.getUserMsgAsync()()

  useEffect(() => {
    asideRender();
    // console.log('storestore', name, user);
  }, [])

  // 切换侧边栏
  const [allAside, setAllAside] = useState()
  async function asideRender() {
    const aa = await getRoutersAside()
    // console.log('aa', aa);
    setAside(aa)
    setAllAside(objHeavy(aa))

    console.log('arr.children', arr?.children, a);
    // setInitialItems(aa)
  }
  function toFind(arr, e) {
    // console.log('setAllAside(objHeavy(aa))', allAside);
    return arr.filter(a => {
      if (a.children) {
        return toFind(a.children, e)
      }
      return a.key === e.key
    })

  }
  function tagAside(e) {
    console.log('tagAside', e);
    navigate(e.key)
    showBread()
    add(e)
    setItems([
      ...items,
      // ...toFind(allAside, e)
    ])
    console.log('toFind(allAside, e)', e.key, toFind(allAside, e));
  }

  // tabs
  const [activeKey, setActiveKey] = useState()
  const [items, setItems] = useState([])
  function onChange(a, b) {
    console.log('onChange', a, b);
  }
  function onEdit(a, b) {
    console.log('onEdit', a, b);
  }
  function add(a) {
    console.log('add', a);
    setItems([
      ...items,
      {
        label: breadcrumbs
      }
    ])
  }


  // 面包削动态渲染
  function showBread(key = pathname) {
    // 面包削动态渲染
    console.log('pathname', key, breadcrumbs);
    return Object.keys(breadcrumbs).map((a) => {
      if (a === key) {

        if (breadcrumbs[a].length > 1) {
          console.log('breadcrumbs[a]', breadcrumbs[a]);
          return <Breadcrumb>
            {breadcrumbs[a].map((b) => {
              return <Breadcrumb.Item key={b.title}>
                {b.title}
              </Breadcrumb.Item>
            })}
          </Breadcrumb>
        }
        return <></>
      }
      return <></>

    })
  }


  // console.log(111111111, pathname, 2222, pathname.split('/')[1]);

  // 去重
  function objHeavy(arr) {
    let newObj = {};
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i]
      if (!newObj[item.key]) {
        newObj[item.key] = newArr.push(item)
      }
    }
    return newArr
  }

  return (
    <Layout className='vh100'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='NavTitle'>赤兔养车</div>
        <Menu
          theme="dark"
          mode="inline"
          // forceSubMenuRender={true}
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={['/' + pathname.split('/')[1]]}
          // openKeys={[pathname]}
          selectedKeys={[pathname]}
          // openKeys={['/' + pathname.split('/')[1]]}
          // items={aside}
          items={objHeavy(aside)}
          onClick={(e) => tagAside(e)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: "space-between" }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div>


            <Dropdown overlay={menu}>
              <a
                onClick={e => e.preventDefault()}
                style={{ display: 'inline-block', paddingRight: 20, height: 60 }}>
                <Space style={{ height: '60px' }}>
                  <img
                    style={{ width: 40, borderRadius: '50%', marginRight: 20 }}
                    src={"http://xawn.f3322.net:8002/distremote/static/avatar/" + avatar}
                    alt="" />
                  {username}
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* 面包屑 */}
          {Object.keys(breadcrumbs).map((a) => {
            if (a === pathname) {
              if (breadcrumbs[a].length > 1) {
                // console.log('breadcrumbs[a]', breadcrumbs[a]);
                return <Breadcrumb key={a}>
                  {breadcrumbs[a].map((b) => {
                    return <Breadcrumb.Item key={b.title}>
                      <NavLink to={b.link}>{b.title}</NavLink>
                    </Breadcrumb.Item>
                  })}
                </Breadcrumb>
              }
            }
          })}
          {/* tabs */}
          <div>

            <Tabs
              hideAdd
              onChange={onChange}
              activeKey={activeKey}
              type="editable-card"
              onEdit={onEdit}
              items={items}
            />
          </div>
          {/* 路由出口 */}
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}
