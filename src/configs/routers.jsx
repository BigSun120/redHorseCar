import { Routes, Route } from 'react-router-dom';
import { routersApi } from '../apis/user'
import React from 'react';
import ReactDOM from 'react-dom/client'

import homeImg from '../assets/images/icons/home.png'

const Login = React.lazy(() => import('../pages/Login'))
const Reg = React.lazy(() => import('../pages/Reg'))
const NavPage = React.lazy(() => import('../pages/homePageView/HomePageView'))
const Home = React.lazy(() => import('../pages/home/Home'))
const NotFound = React.lazy(() => import('../pages/NotFound'))


// const User = React.lazy(() => import('../pages/system/user'))
// const Role = React.lazy(() => import('../pages/system/role'))


// import Home from '../pages/home/Home';
// import User from '../pages/system/user';  
import User from '../pages/system/user';//system/user/User
import Role from '../pages/system/role';
import Menu from '../pages/system/menu';
import Dict from '../pages/system/dict';
import Profile from '../pages/personal/Profile';

let R = []

export let routers = [
  {
    path: '/login',
    element: Login
  },
  {
    path: '/reg',
    element: Reg
  },
  {
    path: '/navPage',
    element: NavPage,
  },
  {
    path: '/',
    element: NavPage,
  },
  {
    path: '*',
    element: NotFound,
  },
  {
    path: '/home',
    element: NavPage,
    children: [
      {
        path: '/home',
        index: true,
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
  {
    path: '/profile',
    element: NavPage,
    children: [
      {
        path: '/profile',
        element: Profile
      }
    ]
  },
]

// export let routers = [
//   {
//     path: '/login',
//     element: Login
//   },
//   {
//     path: '/reg',
//     element: Reg
//   },
//   {
//     path: '/navPage',
//     element: NavPage,
//   },
//   {
//     path: '/',
//     element: NavPage,
//   },
//   {
//     path: '*',
//     element: NotFound,
//   },
//   {
//     path: '/home',
//     element: NavPage,
//     children: [
//       {
//         path: '/home',
//         index: true,
//         element: Home,
//       }
//     ]
//   },
//   // ...o
// ]
// getRouters()

// 获取用户信息
// export async function getUserMsg() {
//   const { username } = JSON.parse(localStorage.user)
//   const data = await routersApi(username);
//   routers = data[0]
//   // routers = data[0].children
//   console.log('getRouters123123', routers);
//   return routers
// }
// getUserMsg()

// 根据 用户名 生成路由

export async function getRoutersAside() {
  const { username } = JSON.parse(localStorage.user)
  const data = await routersApi(username);
  // routers = data[0].children
  // console.log('getRoutersAside', data[0].children);
  // console.log('getRoutersAside------data', data[0].children);
  const arr = JSON.parse(JSON.stringify(data[0].children));
  // console.log('arr', arr);
  return formatMenus(arr)
}

function formatMenus(arr) {
  const abc = arr.map(item => {
    let o = {
      key: item.path,
      label: item.name,
      title: item.name,
      icon: <> </>,
      // element: React.lazy(() => import(`../pages/${item.component}`))
      // element: import(`../pages/${item.component}`)
      // element: import(`../pages/system/user`)
    };
    // console.log(o);
    // console.log('item.component111', item.component);

    if (item.children) {
      o.children = formatMenus(item.children)
    }
    if (!item.children) {
      // console.log('item.component222',
      //   item.component.split('/')[0], 
      //   '/',
      //   item.component.split('/')[item.component.split('/').length - 1]
      // );
      // o.element = React.lazy(() => import(`../pages/${item.component.split('/')[0]}/${item.component.split('/')[item.component.split('/').length - 1]}`))
      // o.element = React.lazy(() => import(`../pages/${item.component}`))
      // o.element = User
    }
    if (item.icon) {
      // console.log(6666, item);
      o.icon = <i className={"iconfont icon-" + item.icon} style={{ width: 20 }} alt="" />
    }
    R.push(o)
    return o;
  })
  routers = [...routers, ...R]
  return abc
}

