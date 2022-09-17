import React, { useState, FC } from 'react'
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './assets/styles/index.css'
import { routers } from './configs/routers';


const Login = React.lazy(() => import('./pages/Login'))
const Reg = React.lazy(() => import('./pages/Reg'))
const NavPage = React.lazy(() => import('./pages/homePageView/HomePageView'))
// const User = React.lazy(() => import('./pages/system/user'))

const App: FC = () => {
  function renderRoutes(routers: any[]) {

    // const aaa = getRouters()
    // console.log('aaa', aaa);

    // getRouters().forEach(a => {
    //   console.log(a);
    // })
    return <>
      {
        routers.map(a => {
          if (a.children) {
            // console.log('a.element', a.path, a.element);
            return <Route path={a.path} element={<a.element />} key={a.path}>
              {renderRoutes(a.children)}
            </Route>
          }
          return <Route path={a.path} element={<a.element />} key={a.path}></Route>
        })
      }
    </>
  }

  return (
    <React.Suspense fallback={<div>加载中...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="login" />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Reg />} />
          {
            renderRoutes(routers)
          }
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  )
}
export default App
