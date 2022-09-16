import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { getRoutersAside } from '../../configs/routers';
import { useNavigate, Outlet, } from 'react-router-dom';
import { useLocation } from 'react-router';
// import { store } from '../../store';
import { useSelector, useDispatch } from 'react-redux'

export default function NavPage() {
  const navigate = useNavigate()

  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [aside, setAside] = useState([])

  const { pathname, hash } = useLocation()

  // 获取状态机 中的 用户信息
  const name = useSelector((state: any) => state.user.name)


  useEffect(() => {
    asideRender();
    console.log('storestore', name);

  }, [])

  // 切换侧边栏
  async function asideRender() {
    const aa = await getRoutersAside()
    console.log('aa', aa);
    setAside(aa)
  }
  function tagAside(e: any) {
    console.log('tagAside', e);
    navigate(e.key)
  }

  // console.log(111111111, pathname, 2222, pathname.split('/')[1]);

  return (
    <Layout className='vh100'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='NavTitle'>赤兔养车</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={['/' + pathname.split('/')[1]]}
          items={aside}
          onClick={(e: any) => tagAside(e)}
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
          <div>123
            <img src="" alt="" />
            <span>
              name
            </span>
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
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}
