import { Routes, Route } from 'react-router-dom';
import { routersApi } from '../apis/user'
import React from 'react';

const Login = React.lazy(() => import('../pages/Login'))
const Reg = React.lazy(() => import('../pages/Reg'))
const NavPage = React.lazy(() => import('../pages/navPage/NavPage'))
// const Home = React.lazy(() => import('../pages/home/Home'))
const NotFound = React.lazy(() => import('../pages/NotFound'))

import Home from '../pages/home/Home';
import User from '../pages/system/user';
import Role from '../pages/system/role';
import Menu from '../pages/system/menu';
import Dict from '../pages/system/dict';

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
        path: '/system/user',
        index: true,
        element: React.lazy(() => import('../pages/system/user'))
      },
      {
        path: '/system/role',
        index: true,
        element: React.lazy(() => import('../pages/system/role'))
      },
      {
        path: '/system/menu',
        index: true,
        element: Menu
      },
      {
        path: '/system/dict',
        index: true,
        element: Dict
      },
    ]
  },
]

// getRouters()
// export async function getRouters() {
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
    };
    if (item.children) {
      o.children = formatMenus(item.children)
    }
    return o;
  })
}

