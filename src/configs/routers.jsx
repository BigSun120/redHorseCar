import { Routes, Route } from 'react-router-dom';
import { routersApi } from '../apis/user'
import React from 'react';
import ReactDOM from 'react-dom/client'

import homeImg from '../assets/images/icons/home.png'

const Login = React.lazy(() => import('../pages/Login'))
const Reg = React.lazy(() => import('../pages/Reg'))
const NavPage = React.lazy(() => import('../pages/homePageView/HomePageView'))
// const Home = React.lazy(() => import('../pages/home/Home'))
const NotFound = React.lazy(() => import('../pages/NotFound'))

import Home from '../pages/home/Home';
import User from '../pages/system/User';
import Role from '../pages/system/Role';
import Menu from '../pages/system/Menu';
import Dict from '../pages/system/Dict';

export const routers = [
  // {
  //   path: '/login',
  //   element: Login
  // },
  {
    path: '/navPage',
    element: NavPage
  },
  {
    path: '*',
    element: NotFound,
    // children: [
    //   {
    //     path: '*',
    //     element: NotFound,
    //   }
    // ]
  },
  {
    path: '/home',
    element: NavPage,
    children: [
      {
        path: '/home',
        element: Home,
      }
    ]
  },

  {
    path: '/system',
    element: NavPage,
    children: [
      {
        path: 'user',
        element: User
      },
      {
        path: 'role',
        element: Role
      },
      {
        path: 'menu',
        element: Menu
      },
      {
        path: 'dict',
        element: Dict
      },
    ]
  },
]

// getRouters()

// // 获取用户信息
// export async function getUserMsg() {
//   const { username } = JSON.parse(localStorage.user)
//   const data = await routersApi(username);
//   routers = data[0]
//   // routers = data[0].children
//   console.log('getRouters', routers);
//   return routers
// }

export async function getRoutersAside() {
  const { username } = JSON.parse(localStorage.user)
  const data = await routersApi(username);
  // routers = data[0].children
  // console.log('getRoutersAside', data[0].children);
  return formatMenus(data[0].children)
}

function formatMenus(arr) {
  return arr.map(item => {
    const o = {
      key: item.path,
      label: item.name,
      title: item.name,
      icon: <> </>
    };
    if (item.children) {
      o.children = formatMenus(item.children)
    }
    if (item.icon) {
      // console.log(6666, item);
      o.icon = <i className={"iconfont icon-" + item.icon} style={{ width: 20 }} alt="" />
    }
    return o;
  })
}

